
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <iconv.h>
#include <gettext-po.h>
#include <mysql/mysql.h>

#define BUFLEN 1024
#define MAXENCLEN 80

void
get_encoding(char *encoding, const char *pmsgstr) {
	/* len(char_pre) => 8 */
	char *char_pre = "charset=";
	char *encb, *ence; /* encoding begine, encoding end */

	encb = strstr(pmsgstr, char_pre);
	encb = encb + 8;
	if (encb == '\0') {
		printf("can't find encoding\n");
		exit(-1);
	}
	ence = strstr(encb, "\n");
	if (ence == NULL) {
		printf("can't find encoding\n");
		exit(-1);
	}
	if ((int) (ence - encb) > MAXENCLEN) {
		printf("encoding too long (%i)\n", (int) (ence - encb));
		exit(-1);
	}
	strncpy(encoding, encb, ence - encb);
	encoding[ence - encb] = '\0';
}

/* from document of mysql_real_escape, the maxmun needed buffer
 * is (length * 2 + 1) where length is the string to be escape.
 */
char *
check_mysql_buf(char *pbuf, int *pbuflen, const char *to_be_escape) {
	int len;

	len = strlen(to_be_escape);
	if (len * 2 + 1 > *pbuflen) {
		*pbuflen = len * 2 + 1;
		pbuf = realloc(pbuf, *pbuflen);
		if (pbuf == NULL) {
			printf("can't realloc to len %i\n", *pbuflen);
			exit(-1);
		}
	}
	return pbuf;
}

int
main(int argc, char *argv[]) {
	po_file_t pof = NULL;
	po_message_iterator_t po_mi;
	po_message_t po_mg;
	int buflen;
	char *pbuf;
	const char *pmsgid, *pmsgstr;
	char encoding[MAXENCLEN + 1];

	if (argc != 4) {
		printf("usage: %s pofile project fpath\n", argv[0]);
		return 1;
	}
	pof = po_file_read(argv[1]);
	if (pof == NULL) {
		printf("can't open po file\n");
		return 1;
	}
	po_mi = po_message_iterator(pof, NULL);
	if (po_mi == NULL) {
		printf("can't open po_message_iterator\n");
		return 1;
	}
	/* get encoding field of this */
	po_mg = po_next_message(po_mi);
	pmsgid = po_message_msgid(po_mg);
	pmsgstr = po_message_msgstr(po_mg);
	if (*pmsgid != '\0') {
		printf("First message id is not null string, fatal\n");
		exit(-1);
	}
	get_encoding(encoding, pmsgstr);
	/* printf("encoding of this po file is :%s:\n", encoding);
	 */
	
	buflen = BUFLEN;
	pbuf = (char *) malloc(sizeof(char) * buflen);
	while ((po_mg = po_next_message(po_mi))) {

		printf ("insert into potb values (\"%s\", \"%s\", ",
			argv[2], argv[3]);

		pmsgid = po_message_msgid(po_mg);
		pbuf = check_mysql_buf(pbuf, &buflen, pmsgid);
		pmsgstr = po_message_msgstr(po_mg);
		pbuf = check_mysql_buf(pbuf, &buflen, pmsgstr);
		mysql_escape_string(pbuf, pmsgid, strlen(pmsgid));
		// printf("message %i id:%s:\n", strlen(pmsgid), pbuf);
		printf("\"%s\", ", pbuf);
		mysql_escape_string(pbuf, pmsgstr, strlen(pmsgstr));
		// printf("message %i str:%s:\n", strlen(pmsgstr), pbuf);
		printf("\"%s\"", pbuf);
		printf(");\n");
	}

	po_message_iterator_free(po_mi);
	po_file_free(pof);
	return 0;
}
