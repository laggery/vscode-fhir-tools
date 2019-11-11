# vscode-fhir-tools

Fhir tools is an open-source extension for [Visual Studio Code](https://code.visualstudio.com) created by Yannick Lagger.

See the [release notes](https://github.com/laggery/vscode-fhir-tools/blob/master/CHANGELOG.md 'Open Release Notes') for the full set of changes

## Features

### Convert XML fhir resource to JSON

<p align="center">
  <img src="https://raw.githubusercontent.com/laggery/vscode-fhir-tools/master/docs/images/xml-to-json.jpg?token=AATRZX7XRUMZAZCEZEW2PYK5ZFNRS"
  alt="Convert XML fhir resource to JSON" />
</p>

- Right click on xml resource
- Select "Fhir xml to json

### Convert JSON fhir resource to XML

<p align="center">
  <img src="https://raw.githubusercontent.com/laggery/vscode-fhir-tools/master/docs/images/json-to-xml.jpg?token=AATRZX3U4SA2LKOVZBADGZK5ZFNME"
  alt="Convert JSON fhir resource to XML" />
</p>

- Right click on json resource
- Select "Fhir json to xml

### Validate fhir resource (XML or JSON)

<p align="center">
  <img src="https://raw.githubusercontent.com/laggery/vscode-fhir-tools/master/docs/images/validate-resource.jpg?token=AATRZX3DLSLQOMPSW5EW34S5ZFNS6"
  alt="Validate fhir resource" />
</p>

- Right click on json or xml resource
- Select "Fhir validate resource - The terminal will launch and validate the resource

### Fhirpath search on resource

<p align="center">
  <img src="https://raw.githubusercontent.com/laggery/vscode-fhir-tools/master/docs/images/fhirpath.jpg?token=AATRZX7OTN356N437OS2TXS5ZFNLU"
  alt="Fhirpath tool" />
</p>

- Right click on json or xml resource
- A new panel on the right side will open
- You can then try your fhirpath queries and immediatly see the result

## Requirements

The resource validation use the official [fhir validator](https://wiki.hl7.org/Using_the_FHIR_Validator 'Open hl7 wiki'). For this reason you must have JAVA jre installed and in your path.

## Known Issues

At the moment there are no known issues.
If you find some issues please create an issue on github

## Licence

Copyright (C) Yannick Lagger, Switzerland.
Fhir-tools is released under the [GPL3 License](https://opensource.org/licenses/GPL-3.0)

## Other used open source project

- npm fhirpath <https://github.com/HL7/fhirpath.js>
- npm fhir <https://github.com/lantanagroup/FHIR.js>
