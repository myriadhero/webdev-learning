# Wiki

This is a quick wiki server that uses Django to store markdown pages in file system, and show them to users in html.

Check specs.md for all the implemented features.

Python-markdown2 package was used to perform this conversion, installable via `pip3 install markdown2`.

To display custom 404 page - set `DEBUG = False`, and configure site for production or run server with `--insecure` flag.

