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

const projects = [
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

const currencies = [
  "AED - Emirati dirham",
  "ARS - Argentine peso",
  "AUD - Australian dollar",
  "BDT - Bangladeshi taka",
  "BGN - Bulgarian lev",
  "BRL - Brazilian real",
  "CAD - Canadian dollar",
  "CHF - Swiss franc",
  "CLP - Chilean peso",
  "CNY - Chinese yuan",
  "CZK - Czech koruna",
  "DKK - Danish krone",
  "EGP - Egyptian pound",
  "EUR - Euro",
  "GBP - British pound",
  "GEL - Georgian lari",
  "GHS - Ghanaian cedi",
  "HKD - Hong Kong dollar",
  "HRK - Croatian kuna",
  "HUF - Hungarian forint",
  "IDR - Indonesian rupiah",
  "ILS - Israeli new shekel",
  "INR - Indian rupee",
  "JPY - Japanese yen",
  "KES - Kenyan shilling",
  "LKR - Sri Lankan rupee",
  "MAD - Mauritian rupee",
  "MXN - Mexican peso",
  "MYR - Malaysian ringgit",
  "NGN - Nigerian naria",
  "NOK - Norwegian krone",
  "NPR - Nepalese rupee",
  "NZD - New Zealand dollar",
  "PEN - Peruvian neuvo sol",
  "PHP - Philippine piso",
  "PKR - Pakistani rupee",
  "PLN - Polish zloty",
  "RON - Romanian leu",
  "RUB - Russian ruble",
  "SEK - Swedish krona",
  "SGD - Singapore dollar",
  "THB - Thai baht",
  "TRY - Turkish lira",
  "UAH - Ukranian hryvnia",
  "VND - Vietnamese dong",
  "ZAR - South African rand"
]

const schema = {
  title: "",
  type: "object",
  definitions: {
    currencies: {
      type: "string",
      enumNames: currencies,
      enum: currencies.map(
        currency => {
          return(currency.split(" - ")[0]);
        }
      )
    },
    projects: {
      type: "string",
      enum: projects
    }
  },
  properties: {
    meta: {
      type: "object",
      title: "meta information",
      properties: {
        project: {
          title: "project",
          "$ref": "#/definitions/projects"
        },
        date: {
          title: "date",
          type: "string", format: "date"
        },
        name: {
          title: "name",
          type: "string"
        },
        email: {
          title: "email",
          type: "string", format: "email"
        }
      },
      required: [
        "date",
        "email",
        "project",
        "name"
      ]
    },
    curr: {
      type: "object",
      title: "currency information",
      properties: {
        currency: {
          title: "currency", "$ref": "#/definitions/currencies"},
        AED: {
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        ARS: {
          title: "",
          type: "object",
          properties: {
            tax_id: {
              title: "Tax ID (CUIL, CUIT)",
              type: "string"
            },
            account_number: {
              title: "Account Number (CBU)",
              type: "string"
            }
          },
          required: [
            "tax_id",
            "account_number"
          ]
        },
        AUD: {
          title: "",
          type: "object",
          properties: {
            bbs_code: {
              title: "BBS Code",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bbs_code",
            "account_number"
          ]
        },
        BDT: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            branch_name: {
              title: "Branch Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "branch_name",
            "account_number"
          ]
        },
        BGN: {
          title: "",
          type: "object",
          properties:{
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        BRL: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            branch_code: {
              title: "Branch Code",
              type: "string"
            },
            account_type: {
              title: "Account Type",
              type: "string",
              enum: [
                "checking",
                "savings"
              ]
            },
            account_number: {
              title: "Account Number",
              type: "string"
            },
            recipient_phone_number: {
              title: "Recipient Phone Number",
              type: "string"
            },
            recipient_tax_registration_number: {
              title: "Recipient Tax Registration Number (CPF)",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "branch_code",
            "account_number",
            "account_type",
            "recipient_phone_number",
            "recipient_tax_registration_number"
          ]
        },
        CAD: { // TODO interac option
          title: "",
          type: "object",
          properties: {
            bank_institution_number: {
              title: "Bank Institution Number",
              type: "string"
            },
            branch_transit_number: {
              title: "Branch Transit Number",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            },
            account_type: {
              title: "Account Type",
              type: "string",
              enum: [
                "checking",
                "savings"
              ]
            }
          },
          required: [
            "bank_institution_number",
            "branch_transit_number",
            "account_number",
            "account_type"
          ]
        },
        CHF: {
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        CLP: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            bank_code: {
              title: "Bank Code",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            },
            account_type: {
              title: "Account Type",
              type: "string"
            },
            recipient_rut_number: {
              title: "Recipient's Rol Unico Tributario",
              type: "string"
            },
            recipient_phone_number: {
              title: "Recipient's Phone Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "bank_code",
            "account_number",
            "account_type",
            "recipient_rut_number",
            "recipient_phone_number"
          ]
        },
        CNY: {
          title: "",
          type: "object",
          properties: {
            unionpay_card_number: {
              title: "UnionPay Card Number",
              type: "string"
            }
          },
          required: [
            "unionpay_card_number"
          ]
        },
        CZK: { // TODO local option
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        DKK: {
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        EGP: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "account_number"
          ]
        },
        EUR: {
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        GBP: { // TODO local option
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        GEL: {
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        GHS: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "account_number"
          ]
        },
        HKD: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            account_number: {
              title: "Account Number (12 digits!)",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "account_number"
          ]
        },
        HRK: {
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        HUF: { // TODO local option
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        IDR: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "account_number"
          ]
        },
        ILS: {
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        INR: {
          title: "",
          type: "object",
          properties: {
            ifsc_code: {
              title: "IFSC Code",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "ifsc_code",
            "account_number"
          ]
        },
        JPY: {
          title: "",
          type: "object",
          properties: {
            recipient_name_latin: {
            },
            recipient_name_katakana: {
            },
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            branch_name: {
              title: "Branch Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            },
            account_type: {
              title: "Account Type",
              type: "string",
              enum: [
                "Futsuu",
                "Chochiku",
                "Touza"
              ]
            }
          },
          required: [
            "bank_name",
            "branch_name",
            "account_number",
            "account_type"
          ]
        },
        KES: { // TODO M-PESA option
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            account_name: {
              title: "Account Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "account_name",
            "account_number"
          ]
        },
        LKR: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            branch_name: {
              title: "Bank Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "branch_name",
            "account_number"
          ]
        },
        MAD: {
          title: "",
          type: "object",
          properties: {
            swift_number: {
              title: "BIC/SWIFT Number",
              type: "string"
            },
            account_number: {
              title: "Account Number (RIB)",
              type: "string"
            }
          },
          required: [
            "swift_number",
            "account_number"
          ]
        },
        MXN: {
          title: "",
          type: "object",
          properties: {
            clabe: {
              title: "CLABE",
              type: "string"
            }
          },
          required: [
            "clabe"
          ]
        },
        MYR: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "account_number"
          ]
        },
        NGN: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "account_number"
          ]
        },
        NOK: {
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        NPR: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "account_number"
          ]
        },
        NZD: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "account_number"
          ]
        },
        PEN: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            bank_code: {
              title: "Bank Code",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            },
            account_type: {
              title: "Account Type",
              type: "string",
              enum: [
                "checking",
                "savings"
              ]
            },
            recipient_phone_number: {
              title: "Recipient Phone Number",
              type: "string"
            },
            recipient_identification_doc_type: {
              title: "Recipient ID Document Type",
              type: "string"
            },
            recipient_identification_number: {
              title: "Recipient Identification Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "bank_code",
            "account_number",
            "account_type",
            "recipient_phone_number",
            "recipient_identification_doc_type",
            "recipient_identification_numter"
          ]
        },
        PHP: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "account_number"
          ]
        },
        PKR: {
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        PLN: {
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        RON: {
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        RUB: { // TODO cards option
          title: "",
          type: "object",
          properties: {
            account_number: {
              title: "Account Number",
              type: "string"
            },
            bik: {
              title: "BIK",
              type: "string"
            },
            region: {
              title: "Region",
              type: "string"
            }
          },
          required: [
            "account_number",
            "bik",
            "region"
          ]
        },
        SEK: { // TODO local option
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        SGD: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "account_number"
          ]
        },
        THB: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "account_number"
          ]
        },
        TRY: {
          title: "",
          type: "object",
          properties: {
            iban: {
              title: "IBAN",
              type: "string"
            }
          },
          required: [
            "iban"
          ]
        },
        UAH: {
          title: "",
          type: "object",
          properties: {
            recipient_phone_number: {
              title: "Recipient Phone Number",
              type: "string"
            },
            uah_privatbank_card: {
              title: "UAH PrivatBank Card (last 4 digits only)",
              type: "string"
            }
          },
          required: [
            "recipient_phone_number",
            "uah_privatbank_card"
          ]
        },
        VND: {
          title: "",
          type: "object",
          properties: {
            bank_name: {
              title: "Bank Name",
              type: "string"
            },
            branch_name: {
              title: "Bank Name",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "bank_name",
            "branch_name",
            "account_number"
          ]
        },
        ZAR: {
          title: "",
          type: "object",
          properties: {
            swift_number: {
              title: "BIC/SWIFT Number",
              type: "string"
            },
            account_number: {
              title: "Account Number",
              type: "string"
            }
          },
          required: [
            "swift_number",
            "account_number"
          ]
        }
      },
      required: ["currency"]
    }
  }
};

const uiSchema = { };

const rules = currencies.map(
  currency => {
    var currencyCode = currency.split(" - ")[0];
    return (
      {
        conditions: {
          "curr.currency": {
            not: {
              equal:currencyCode 
            }
          }
        },
        event: {
          type: "remove",
          params: {
            field: "curr." + currencyCode
          }
        }
      }
    );
  }
);

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

  onSubmit(state) {
    var makeMetaBody = function(schema, formData) {
      var body = [
        [
          {text: schema.title, colSpan: 2, style: "table"},
          {}
        ]
      ];

      for (var x in formData) {
        body.push(
          [
            {text: schema.properties[x].title},
            {text: formData[x]}
          ]
        );
      }

      return(body);
    };

    var makeCurrBody = function(schema, formData) {
      var x = formData["currency"];

      var body = [
        [
          {text: schema.title, colSpan: 2, style: "table"},
          {}
        ],
        [
          {text: "currency"},
          {text: x}
        ]
      ];

      for (var y in formData[x]) {
        body.push(
          [
            {text: schema.properties[x].properties[y].title},
            {text: formData[x][y]}
          ]
        );
      }

      return(body);
    };

    var makeDocDefinition = function(schema, formData) {
      var docDefinition = {
        styles: {
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
        },
        content: [
          {
            text: "Reimbursement Request",
            style: "title"
          },
          {
            table: {
              headerRows: 1,
              widths: [100, "*"],
              body: makeMetaBody(schema.properties["meta"], formData["meta"])
            },
            margin: [0, 15, 0, 0]
          },
          {
            table: {
              headerRows: 1,
              widths: [100, "*"],
              body: makeCurrBody(schema.properties["curr"], formData["curr"])
            },
            margin: [0, 15, 0, 0]
          },
        ]
      };

      return(docDefinition);
    }

    pdfMake.createPdf(makeDocDefinition(schema, state.formData)).download();
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
