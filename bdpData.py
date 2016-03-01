#!/usr/bin/env python

import requests
import json

URL = 'https://bpd-api.lbl.gov/api/v2/analyze/histogram'

def stateFilter(abbrev):
    return json.dumps({
        'filters':
            {
                'building_class': ['Commercial'],
                'state': {
                    'values': [abbrev],
                    'exclude': 'False'
                }
            },
        'group_by': ['site_eui'],
        'resolution': 'high'
    })

HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'ApiKey eosk@design.upenn.edu:8e65addf-182f-488b-afea-487c5acc5358'
}

STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

if __name__ == '__main__':
    resultObject = {}
    for state in STATES:
        resultObject[state] = json.loads(requests.post(url=URL, data=stateFilter(state), headers=HEADERS).text)

    with open('histograms.json', 'w') as f:
        f.write(json.dumps(resultObject))

