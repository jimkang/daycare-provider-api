daycare-provider-api
====================

Serves details about daycare providers using data from the Massachusetts Department of Early Education and Childcare.

Installation
------------

Clone this repo.

Then, run `make data/geocodedproviders.json` target in the [masschildcaredata](https://github.com/masschildcaredata/masschildcaredata.github.io) repo.

Copy `geocodedproviders.json` to the `data` directory in this project.

Run `make data/providers.db` to build the database from the `geocodedproviders.json` file.

Usage
-----

    make run

With Docker:

    docker run -v $(HOMEDIR)/config:/usr/src/app/config \
        -v $(HOMEDIR)/data:/usr/src/app/data \
        jkang/daycare-provider-api

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2015 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
