// Copyright (C) 2018 Luca Filipozzi

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col } from "reactstrap";
import { Card, CardHeader, CardBody } from "reactstrap";
import { Collapse } from "reactstrap";
import { Table } from "reactstrap";
import Form from "react-jsonschema-form";
import Engine from "json-rules-engine-simplified";
import applyRules from "react-jsonschema-form-conditionals";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const schema = {
  title: "",
  type: "object",
  definitions: {
    currencies: {
      type: "string",
      enum: [
        "AED",
        "AUD",
        "BBD",
        "BGN",
        "BHD",
        "BRL",
        "BSD",
        "BWP",
        "BZD",
        "CAD",
        "CHF",
        "CZK",
        "DKK",
        "EUR",
        "FJD",
        "GBP",
        "GHS",
        "HRK",
        "HUF",
        "ILS",
        "JMD",
        "JOD",
        "JPY",
        "KES",
        "KWD",
        "LKR",
        "LSL",
        "MUR",
        "MWK",
        "MXN",
        "NOK",
        "NZD",
        "OMR",
        "PHP",
        "PKR",
        "PLN",
        "QAR",
        "RON",
        "RSD",
        "SAR",
        "SEK",
        "SGD",
        "SZL",
        "THB",
        "TND",
        "TRY",
        "TTD",
        "USD",
        "XCD",
        "ZAR",
        "ZMW",
      ],
      enumNames: [
        "AED - Emirati dirham",
        "AUD - Australian dollar",
        "BBD - Barbadian dollar",
        "BGN - Bulgarian lev",
        "BHD - Bahraini dinar",
        "BRL - Brazilian real",
        "BSD - Bahamian dollar",
        "BWP - Botswanan pula",
        "BZD - Belizean dollar",
        "CAD - Canadian dollar",
        "CHF - Swiss franc",
        "CZK - Czech koruna",
        "DKK - Danish krone",
        "EUR - Euro",
        "FJD - Fijian dollar",
        "GBP - British pound",
        "GHS - Ghanaian cedi",
        "HRK - Croatian kuna",
        "HUF - Hungarian forint",
        "ILS - Israeli new shekel",
        "JMD - Jamaican dollar",
        "JOD - Jordanian dinar",
        "JPY - Japanese yen",
        "KES - Kenyan shilling",
        "KWD - Kuwaiti dinar",
        "LKR - Sri Lankan rupee",
        "LSL - Basotho loti",
        "MUR - Mauritian rupee",
        "MWK - Malawian kwacha",
        "MXN - Mexican peso",
        "NOK - Norwegian krone",
        "NZD - New Zealand dollar",
        "OMR - Omani rial",
        "PHP - Philippine piso",
        "PKR - Pakistani rupee",
        "PLN - Polish zloty",
        "QAR - Qatari riyal",
        "RON - Romanian leu",
        "RSD - Serbian dinar",
        "SAR - Saudi riyal",
        "SEK - Swedish krona",
        "SGD - Singapore dollar",
        "SZL - Swazi lilangeni",
        "THB - Thai baht",
        "TND - Tunisian dinar",
        "TRY - Turkish lira",
        "TTD - Trinbagonian dollar",
        "USD - American dollar",
        "XCD - East Caribbean dollar",
        "ZAR - South African rand",
        "ZMW - Zambian kwacha",
      ]
    },
    projects: {
      type: "string",
      enum: [
        "0 A.D.",
        "ankur.org.in",
        "aptosid",
        "Arch Linux",
        "ArduPilot",
        "Chakra",
        "Debian",
        "Drizzle",
        "FFmpeg",
        "Fluxbox",
        "freedesktop.org",
        "Fresco",
        "Gallery",
        "Glucosio",
        "GNUstep",
        "GNU TeXmacs",
        "haskell.org",
        "The HeliOS Project",
        "Jenkins",
        "LibreOffice",
        "madwifi-project.org",
        "MinGW",
        "NTPsec",
        "OFTC",
        "Open Bioinformatics Foundation",
        "Open MPI",
        "Open Voting Foundation",
        "OpenEmbedded",
        "OpenVAS",
        "OpenWrt",
        "OpenZFS",
        "Open64",
        "OSUNIX",
        "Path64",
        "Performance Co-Pilot",
        "PostgreSQL",
        "Privoxy",
        "Software in the Public Interest",
        "SproutCore",
        "Swathanthra Malayalam Computing",
        "The Mana World",
        "TideSDK",
        "Torch",
        "Tux4Kids",
        "X.Org",
        "YafaRay"
      ]
    }
  },
  properties: {
    meta: {
      type: "object",
      title: "meta information",
      properties: {
        date:     { title: "date",     type: "string", format: "date" },
        email:    { title: "email",    type: "string", format: "email" },
        project:  { title: "project",  "$ref": "#/definitions/projects" },
        name:     { title: "name",     type: "string" }
      },
      required: ["date", "email", "project", "name"]
    },
    curr: {
      type: "object",
      title: "currency information",
      properties: {
        currency: { title: "currency", "$ref": "#/definitions/currencies"},
        CAD: {
          type: "object",
          title: "",
          properties: {
            alpha: { title: "alpha", type: "string" },
            bravo: { title: "bravo", type: "string" }
          },
          required: ["alpha", "bravo"],
        },
        USD: {
          type: "object",
          title: "",
          properties: {
            delta: { title: "delta", type: "string" },
            gamma: { title: "gamma", type: "string" }
          },
          required: ["delta", "gamma"]
        }
      },
      required: ["currency"]
    },
    acct: {
      type: "object",
      title: "account information",
      properties: {
        iban:    { title: "iban", type: "string" },
      }
    },
    bank: {
      type: "object",
      title: "bank information",
      properties: {
        city:    { title: "city",                   type: "string" },
        country: { title: "country",                type: "string" },
        line1:   { title: "street address",         type: "string" },
        line2:   { title: "street address (cont)",  type: "string" },
        state:   { title: "state",                  type: "string" }
      },
      required: ["city", "country", "line1", "line2", "state"]
    }
  }
};

const uiSchema = {
  "ui:order": [
    "meta",
    "curr",
    "acct",
    "bank"
  ],
  "meta": {
    "ui:order": [
      "project",
      "date",
      "name",
      "email",
    ]
  },
  "curr": {
    "ui:order": [
      "currency",
      "CAD",
      "USD"
    ],
    "CAD": {
      "ui:order": [
        "alpha",
        "bravo"
      ]
    },
    "USD": {
      "ui:order": [
        "delta",
        "gamma"
      ]
    }
  },
  "acct": {
    "ui:order": [
      "iban"
    ]
  },
  "bank": {
    "ui:order": [
      "line1",
      "line2",
      "city",
      "state",
      "country"
    ]
  }
};

const rules = ["CAD", "USD"].map(x => {
  return (
    {
      conditions: {
        "curr.currency": {
          not: {
            equal: x
          }
        }
      },
      event: {
        type: "remove",
        params: {
          field: "curr." + x
        }
      }
    }
  );
});

class Instructions extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: 1 };
  }

  toggle(event) {
    let index = Number(event.target.dataset.index);
    this.setState({ collapse: index });
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader onClick={this.toggle} data-index={1}>Step 1: Prepare the Reimbursement Request</CardHeader>
          <Collapse isOpen={this.state.collapse === 1}>
            <CardBody>
              <p>Use the Form to generate the Reimbursement Request. Ensure that the banking details are accurate. Incorrect banking details are a major source of delays. Click Submit to generate a PDF file, which is generated locally in your browser (no data is transmitted to the server).</p>
            </CardBody>
          </Collapse>
        </Card>
        <Card>
          <CardHeader onClick={this.toggle} data-index={2}>Step 2: Prepare the Expense Report</CardHeader>
          <Collapse isOpen={this.state.collapse === 2}>
            <CardBody>
              <p>Use the <a href="https://www.xe.com/travel-expenses-calculator/">XE Travel Expenses Calculator</a> to prepare an Expense Report. Enter Receipt Details, one row per receipt, specifing the correct date, amount and currency of the transaction. Click the printer icon at the bottom of the form and save as a PDF file.</p>
              <p>Notes:</p>
              <ul>
                <li>Set Name to the name entered in Step 1.</li>
                <li>Set Your Home Currency to the currency entered in Step 1.</li>
                <li>Set Credit Card to 3%, Debit Card to 5%, Foreign Cash to 5%, and Traveller Cheque to 2%.</li>
              </ul>
            </CardBody>
          </Collapse>
        </Card>
        <Card>
          <CardHeader onClick={this.toggle} data-index={3}>Step 3: Prepare the Ordered Receipts</CardHeader>
          <Collapse isOpen={this.state.collapse === 3}>
            <CardBody>
              <p>Collect your receipts in the <em>same order</em> as the rows in the Expense Report from Step 2. Save them as PDF files. For paper receipts, scan them with a multi-function device or photograph them with your phone, converting to PDF.</p>
            </CardBody>
          </Collapse>
        </Card>
        <Card>
          <CardHeader onClick={this.toggle} data-index={4}>Step 4: Prepare the Submission Package</CardHeader>
          <Collapse isOpen={this.state.collapse === 4}>
            <CardBody>
              <p>Collect into a Submission Package (a single PDF file), the following:</p>
              <ul>
                <li>from Step 1, the Reimbursement Request</li>
                <li>from Step 2, the Expense Report</li>
                <li>from Step 3, the Ordered Receipts</li>
              </ul>
              <p>Name it <em>ReimbursementRequest_«YourName»_«IsoDate».pdf</em>.</p>
              <p>Notes:</p>
              <ul>
                <li>An example filename is <em>ReimbursementRequest_LucaFilipozzi_20181006.pdf</em>.</li>
                <li>Ensure that the entire Submission Package can be easily understood as poor quality submissions are a major source of delays.</li>
                <li>Consider using the pdfunite utility from the poppler-utils package (in Debian) to merge the individual PDF files into a single PDF file: <pre>pdfunite step1.pdf step2.pdf step3a.pdf step3b.pdf ... step3n.pdf output.pdf</pre>.</li>
              </ul>
            </CardBody>
          </Collapse>
        </Card>
        <Card>
          <CardHeader onClick={this.toggle} data-index={5}>Step 5: Email the Submission Package</CardHeader>
          <Collapse isOpen={this.state.collapse === 5}>
            <CardBody>
              <p>Prepare an email having these attributes:</p>
              <Table>
                <tbody>
                  <tr>
                    <th>from</th>
                    <td>you</td>
                  </tr>
                  <tr>
                    <th>to</th>
                    <td>treasurer@rt.spi-inc.org (or «to_address» provided to you by event organizer)</td>
                  </tr>
                  <tr>
                    <th>subject</th>
                    <td>Reimbursement Request for «short_description»</td>
                  </tr>
                  <tr>
                    <th>attachment</th>
                    <td>the PDF file prepared in Step 4</td>
                  </tr>
                  <tr>
                    <th>body</th>
                    <td>
                      By submitting this reimbursement request, I declare that I:
                      <ul>
                        <li>seek reimbursement of expenses that are compliant with SPI and applicable Associate Project policies,</li>
                        <li>have not sought nor will seek reimbursement of these expenses from any other source, and</li>
                        <li>have attached sufficient documentation to substantiate my request.</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <p>Notes:</p>
              <ul>
                <li>The Associated Project Liaison must approve your request before SPI will process a reimbursement payment.</li>
                <li>Consequently, <em>the Associated Project Liaison has permission to view your Submission Package, including personal information contained therein</em>.</li>
              </ul>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

class ConditionalForm extends React.Component {
  constructor(props) {
    super(props);
    this.ConditionalForm = applyRules(schema, uiSchema, rules, Engine)(Form);
  }

  /*
  onSubmit(state) {
    const opts = {
      bodyStyles: {
        valign: "top"
      },
      columnStyles: {
        field: {
          columnWidth: 100,
          fontStyle: "bold"
        },
        value: {
          columnWidth: "auto",
        }
      },
      showHeader: "never",
      startY: 80,
      styles: {
        columnWidth: "wrap",
        fontSize: 12,
        overflow: "linebreak"
      },
      theme: "grid"
    };
    const cols = [
      {dataKey: "field", title: "Field"},
      {dataKey: "value", title: "Value"}
    ]
    var rows = [];
    ["meta", "curr", "acct", "bank"].map(x => {
      console.log(x);
      if (uiSchema.hasOwnProperty(x)) {
        uiSchema[x]["ui:order"].map(y => {
          console.log(y);
          if (state.formData[x][y] !== undefined) {
            rows.push(
              {
                field: schema.properties[x].properties[y].title,
                value: state.formData[x][y]
              }
            );
          }
        });
      }
    });
    var pdf = new jsPDF({unit: "pt", format: "letter"});
    pdf.setFontSize(26);
    pdf.text(40, 50, "Reimbursement Request");
    pdf.autoTable(cols, rows, opts);
    pdf.save("spi_reimbursement_request.pdf");
  }
  */

  onSubmit(state) {
    var content = [{text: "Reimbursement Request", style: "title"}];

    ["meta", "curr", "acct", "bank"].forEach(function(x) {
      var body = [
        [
          {text: schema.properties[x].title, colSpan: 2, style: "table"},
          {}
        ]
      ];
      uiSchema[x]["ui:order"].forEach(function(y) {
        if (state.formData[x][y] !== undefined) {
          console.log(state.formData[x]);
          body.push(
            [
              {text: schema.properties[x].properties[y].title},
              {text: state.formData[x][y]}
            ]
          );
        }
      });
      content.push(
        {
          table: {
            headerRows: 1,
            widths: [150, "*"],
            body: body
          },
          margin: [0, 15, 0, 0]
        }
      );
    });

    const styles = {
      title: {
        fontSize: 24,
        bold: true
      },
      table: {
        fontSize: 16,
        bold: true,
        color: 'white',
        fillColor: 'gray',
      }
    };

    pdfMake.createPdf({content: content, styles: styles}).download();
  }

  render() {
    const ConditionalForm = this.ConditionalForm;
    return (
      <Card>
        <CardBody>
          <ConditionalForm schema={schema}
                           uiSchema={uiSchema}
                           rules={rules}
                           onSubmit={this.onSubmit}/>
        </CardBody>
      </Card>
    );
  }
}

class Application extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>SPI Reimbursement Request</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <h3>Form</h3>
            <ConditionalForm/>
          </Col>
          <Col xs="6">
            <h3>Instructions</h3>
            <Instructions/>
          </Col>
        </Row>
      </Container>
    );
  }
}

ReactDOM.render(<Application/>, document.getElementById("application"));

// vim: set ts=2 sw=2 et ai si fdm=indent:
