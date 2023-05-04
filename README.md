[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?business=L6BMYCPYKNH7L&no_recurring=0&item_name=VSCode+Extension+-+FHIR+tools&currency_code=CHF)

Do you like this extension? Help me to make it better with a donation, click the first button.

# vscode-fhir-tools

Vscode-fhir-tools is an open-source extension for [Visual Studio Code](https://code.visualstudio.com) that implement some tools for the FHIR® standard created by Yannick Lagger. This project is not affiliated with, or approved or sponsored by, HL7.

FHIR® is the registered trademark of HL7 and is used with the permission of HL7. Use of the FHIR trademark does not constitute endorsement of this product by HL7.

See the [release notes](https://github.com/laggery/vscode-fhir-tools/blob/master/CHANGELOG.md 'Open Release Notes') for the full set of changes

## Features

### Convert XML FHIR resource to JSON

<p align="center">
  <img src="https://raw.githubusercontent.com/laggery/vscode-fhir-tools/master/docs/images/xml-to-json.jpg"
  alt="Convert XML FHIR resource to JSON" />
</p>

- Right click on xml resource
- Select "FHIR xml to json

### Convert JSON FHIR resource to XML

<p align="center">
  <img src="https://raw.githubusercontent.com/laggery/vscode-fhir-tools/master/docs/images/json-to-xml.jpg"
  alt="Convert JSON FHIR resource to XML" />
</p>

- Right click on json resource
- Select "FHIR json to xml

### Validate FHIR resource (XML or JSON)

<p align="center">
  <img src="https://raw.githubusercontent.com/laggery/vscode-fhir-tools/master/docs/images/validate-resource.jpg"
  alt="Validate FHIR resource" />
</p>

- Right click on json or xml resource
- Select "FHIR validate resource" - The terminal will launch and validate the resource

### Run IGPublisher in terminal

- Open the Command Palette (⇧⌘P)
- and type "FHIR run IGPublisher" - The terminal will launch and run the [FHIR IG Publisher](https://confluence.hl7.org/display/FHIR/IG+Publisher+Documentation) with -ig ig.ini as parameter

### update IG Publisher and Validator

The Java validator and IG Publisher are updated frequently. You can update the tooling by opening the Command Palette (⇧⌘P) and type "FHIR update Java Validator and IGPublisher"

### Validate FHIR resource with multiple parameters

<p align="center">
  <img src="https://raw.githubusercontent.com/laggery/vscode-fhir-tools/master/docs/images/validate-resource-params.png"
  alt="Validate FHIR resource with params" />
</p>

- Right click on json or xml resource
- Select "FHIR validate resource (with params)"
- Set parameters to the inputbox
- The terminal will launch and validate the resource

### Fhirpath search on resource

<p align="center">
  <img src="https://raw.githubusercontent.com/laggery/vscode-fhir-tools/master/docs/images/fhirpath.jpg"
  alt="Fhirpath tool" />
</p>

- Right click on json or xml resource
- A new panel on the right side will open
- You can then try your fhirpath queries and immediatly see the result

## Requirements

The resource validation use the official [FHIR validator](https://confluence.hl7.org/display/FHIR/Using+the+FHIR+Validator 'Open hl7 confluence'). For this reason you must have JAVA jre installed and in your path.

## Known Issues

At the moment there are no known issues.
If you find some issues please create an issue on github

## Licence

Copyright (C) Yannick Lagger, Switzerland.
Fhir-tools is released under the [Apache-2.0](https://opensource.org/licenses/Apache-2.0)

## Other used open source project

- npm fhirpath <https://github.com/HL7/fhirpath.js>
- npm fhir <https://github.com/lantanagroup/FHIR.js>
- npm xml-formatter <https://github.com/chrisbottin/xml-formatter>
