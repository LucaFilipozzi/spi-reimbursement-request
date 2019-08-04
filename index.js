// Copyright (C) 2018 Luca Filipozzi

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import Form from "react-jsonschema-form";
import { Container, Row, Col } from "reactstrap";
import { Card, CardHeader, CardBody } from "reactstrap";
import { Collapse } from "reactstrap";
import { Table } from "reactstrap";
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
  "USD - United States dollar",
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
      title: "meta / recipient information",
      properties: {
        project: {
          title: "Project",
          "$ref": "#/definitions/projects"
        },
        date: {
          title: "Date",
          type: "string", format: "date"
        },
        name: {
          title: "Name",
          type: "string"
        },
        email: {
          title: "Email",
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
      title: "currency / transfer information",
      properties: {
        currency: {
          title: "Currency",
          "$ref": "#/definitions/currencies"
        }
      },
      required: [
        "currency"
      ],
      dependencies: {
        currency: {
          "oneOf": [
            { // AED
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "AED"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // ARS
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "ARS"
                  ]
                },
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
            { // AUD
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "AUD"
                  ]
                },
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
            { // BDT
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "BDT"
                  ]
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
                }
              },
              required: [
                "bank_name",
                "branch_name",
                "account_number"
              ]
            },
            { // BGN
              properties:{
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "BGN"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // BRL
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "BRL"
                  ]
                },
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
            { // CAD - TODO interac option
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "CAD"
                  ]
                },
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
            { // CHF
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "CHF"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // CLP
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "CLP"
                  ]
                },
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
            { // CNY
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "CNY"
                  ]
                },
                unionpay_card_number: {
                  title: "UnionPay Card Number",
                  type: "string"
                }
              },
              required: [
                "unionpay_card_number"
              ]
            },
            { // CZK - TODO local option
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "CZK"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // DKK
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "DKK"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // EGP
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "EGP"
                  ]
                },
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
            { // EUR
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "EUR"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // GBP - TODO local option
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "GBP"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // GEL
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "GEL"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // GHS
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "GHS"
                  ]
                },
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
            { // HKD
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "HKD"
                  ]
                },
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
            { // HRK
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "HRK"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // HUF - TODO local option
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "HUF"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // IDR
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "IDR"
                  ]
                },
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
            { // ILS
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "ILS"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // INR
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "INR"
                  ]
                },
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
            { // JPY
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "JPY"
                  ]
                },
                recipient_name_latin: {
                  title: "Recipient Name (Latin characters)",
                  type: "string"
                },
                recipient_name_katakana: {
                  title: "Recipient Name (Katakana characters)",
                  type: "string"
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
                "recipient_name_latin",
                "recipient_name_katakana",
                "bank_name",
                "branch_name",
                "account_number",
                "account_type"
              ]
            },
            { // KES- - TODO M-PESA option
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "KES"
                  ]
                },
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
            { // LKR
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "LKR"
                  ]
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
                }
              },
              required: [
                "bank_name",
                "branch_name",
                "account_number"
              ]
            },
            { // MAD
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "MAD"
                  ]
                },
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
            { // MXN
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "MXN"
                  ]
                },
                clabe: {
                  title: "CLABE",
                  type: "string"
                }
              },
              required: [
                "clabe"
              ]
            },
            { // MYR
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "MYR"
                  ]
                },
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
            { // NGN
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "NGN"
                  ]
                },
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
            { // NOK
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "NOK"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // NPR
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "NPR"
                  ]
                },
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
            { // NZD
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "NZD"
                  ]
                },
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
            { // PEN
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "PEN"
                  ]
                },
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
            { // PHP
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "PHP"
                  ]
                },
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
            { // PKR
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "PKR"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // PLN
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "PLN"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // RON
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "RON"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // RUB - TODO cards option
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "RUB"
                  ]
                },
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
            { // SEK - TODO local option
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "SEK"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // SGD
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "SGD"
                  ]
                },
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
            { // THB
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "THB"
                  ]
                },
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
            { // TRY
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "TRY"
                  ]
                },
                iban: {
                  title: "IBAN",
                  type: "string"
                }
              },
              required: [
                "iban"
              ]
            },
            { // UAH
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "UAH"
                  ]
                },
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
            { // USD
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "USD"
                  ]
                },
                method: {
                  type: "string",
                  enum: [
                    "ACH",
                    "checking"
                  ]
                }
              },
              required: [
                "method"
              ],
              dependencies: {
                method: {
                  oneOf: [
                    {
                      properties: {
                        method: {
                          type: "string",
                          enum: [
                            "ACH"
                          ]
                        },
                        routing_number: {
                          title: "Routing Number (ABA)",
                          type: "string"
                        },
                        account_number: {
                          title: "Account Number",
                          type: "string"
                        }
                      },
                      required: [
                        "routing_number",
                        "account_number"
                      ]
                    },
                    {
                      properties: {
                        method: {
                          type: "string",
                          enum: [
                            "checking"
                          ]
                        },
                        address_line_one: {
                          title: "Address Line 1",
                          type: "string"
                        },
                        address_line_two: {
                          title: "Address Line 2",
                          type: "string"
                        },
                        address_city: {
                          title: "City",
                          type: "string"
                        },
                        address_state: {
                          title: "State",
                          type: "string"
                        },
                        address_zipcode: {
                          title: "ZIP Code",
                          type: "string"
                        }
                      },
                      required: [
                        "address_line_one",
                        "address_line_two",
                        "address_city",
                        "address_state",
                        "address_zipcode"
                      ]
                    }
                  ]
                }
              }
            },
            { // VND
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "VND"
                  ]
                },
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
            { // ZAR
              properties: {
                currency: {
                  title: "Currency",
                  type: "string",
                  enum: [
                    "ZAR"
                  ]
                },
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
          ]
        }
      }
    }
  }
};

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
              <p>Use the Form to generate the Reimbursement Request. Ensure that the banking details are accurate. Incorrect banking details are a major source of delays. Click Submit to locally generate a PDF file (no data is transmitted to the server).</p>
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
  onSubmit(state) {
    var makeBody = function(title, schema, formData) {
      var body = [
        [
          {text: title, colSpan: 2, style: "table"},
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
            text: "SPI Reimbursement Request",
            style: "title"
          },
          {
            table: {
              headerRows: 1,
              widths: [150, "*"],
              body: makeBody(
                schema.properties["meta"].title,
                schema.properties["meta"],
                formData["meta"]
              )
            },
            margin: [0, 15, 0, 0]
          },
          {
            table: {
              headerRows: 1,
              widths: [150, "*"],
              body: makeBody(
                schema.properties["curr"].title,
                schema.properties["curr"].dependencies.currency.oneOf.find(
                  o => {
                    return o.properties.currency.enum[0] === formData["curr"]["currency"]
                  }
                ),
                formData["curr"]
              )
            },
            margin: [0, 15, 0, 0]
          }
        ]
      };

      return(docDefinition);
    }

    pdfMake.createPdf(makeDocDefinition(schema, state.formData)).download();
  }

  render() {
    return (
      <Card>
        <CardBody>
          <Form schema={schema} onSubmit={this.onSubmit}/>
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
            <ConditionalForm schema={schema}/>
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
