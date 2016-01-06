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

    node daycare-provider-api.js

Or with Docker:

    make run-daycare-provider-api

REST API
---

/providers/:providerids

`providerids` should be a comma-separated list of providerids, e.g.: "2425,11867,13481". The response will be [line-delimited JSON](https://en.wikipedia.org/wiki/JSON_Streaming#Line_delimited_JSON). After the header, each chunk in the http response will be a string containing JSON representing a provider object. e.g.:

    {
      "providerid": "00000",
      "Program Name": "SMIDGEO QUALITY DAYCARE",
      "Has EEC Contract": "Yes",
      "Accepts EEC Vouchers": "Yes",
      "Capacity": "8",
      "First Licensed On": "10/31/2008",
      "Most Recently Renewed": "10/31/2011",
      "EEC Regional Licensing Office": "1250 Hancock Street Suite 120-S  Quincy 02169617-472-2881",
      "EEC Licensor": "Bonus Cat",
      "Type of care": "Family Child Care",
      "First Name": "BONUS",
      "Last Name": "CAT",
      "Telephone": "6170000000",
      "Address": "38 HARVARD ST",
      "City": "SOMERVILLE",
      "State": "MA",
      "ZipCode": "02143-1929",
      "Child Care Resource Referral Agency (CCR&R)": "Child Care Choices of Boston",
      "CCR&R Phone": "617-348-6465",
      "CC&RR Website": "www.childcarechoicesofboston.org",
      "geodata": {
        "street": "38 Bonus Street",
        "adminArea6": "",
        "adminArea6Type": "Neighborhood",
        "adminArea5": "Melrose",
        "adminArea5Type": "City",
        "adminArea4": "Middlesex County",
        "adminArea4Type": "County",
        "adminArea3": "MA",
        "adminArea3Type": "State",
        "adminArea1": "US",
        "adminArea1Type": "Country",
        "postalCode": "02176",
        "geocodeQualityCode": "L1AAA",
        "geocodeQuality": "ADDRESS",
        "dragPoint": false,
        "sideOfStreet": "N",
        "linkId": "0",
        "unknownInput": "",
        "type": "s",
        "latLng": {
          "lat": 43.451271,
          "lng": -70.058754
        },
        "displayLatLng": {
          "lat": 41.451271,
          "lng": -70.058754
        },
        "mapUrl": "http://www.mapquestapi.com/staticmap/v4/getmap?..."
      }
    }

(Except all on one line.)

The client can take advantage of this chunk organization but can also just wait until the response is done, then parse each line.

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
