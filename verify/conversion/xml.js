const xml = (map) => {
  let mxOutput = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <Document>
      <FIToFICstmrCdtTrf>
          <CdtTrfTxInf>
              <PmtId>
              ${map.get('CdtTrfTxInfPmtIdInstrId') ==null?'': `<InstrId>${map.get('CdtTrfTxInfPmtIdInstrId')}</InstrId>`}
              </PmtId>
              <PmtTpInf>
                  <LclInstrm>
                  ${map.get('CdtTrfTxInfPmtTpInfLclInstrmPrtry')==null?'':`<Prtry>${map.get('CdtTrfTxInfPmtTpInfLclInstrmPrtry')}</Prtry>`}
                  </LclInstrm>
              </PmtTpInf>
          ${map.get('CdtTrfTxInfIntrBkSttlmAmtCcy')==null?'':`<IntrBkSttlmAmt>${map.get('CdtTrfTxInfIntrBkSttlmAmtCcy')}</IntrBkSttlmAmt>`}
              <Dbtr>
                  ${map.get('CdtTrfTxInfDbtrNm')==null?'':`<Nm>${map.get('CdtTrfTxInfDbtrNm')}</Nm>`}
                  <PstlAdr>
                  ${map.get('CdtTrfTxInfDbtrPstlAdrAdrLine')==null?'':`<AdrLine>${map.get('CdtTrfTxInfDbtrPstlAdrAdrLine')}</AdrLine>`}
                  </PstlAdr>
              </Dbtr>
              <DbtrAcct>
                  <Id>
                      <Othr>
                      ${map.get('CdtTrfTxInfDbtrCtctDtlsOthrId')==null?'':`<Id>${map.get('CdtTrfTxInfDbtrCtctDtlsOthrId')}</Id>`}
                      </Othr>
                  </Id>
              </DbtrAcct>
              <Cdtr>
              ${map.get('CdtTrfTxInfCdtrNm')==null?'':`<Nm>${map.get('CdtTrfTxInfCdtrNm')}</Nm>`}
              </Cdtr>
              <CdtrAcct>
                  <Id>
                      <Othr>
                      ${map.get('CdtTrfTxInfCdtrAcctPrxyId')==null?'':`<Id>${map.get('CdtTrfTxInfCdtrAcctPrxyId')}</Id>`}
                      </Othr>
                  </Id>
              </CdtrAcct>
          </CdtTrfTxInf>
      </FIToFICstmrCdtTrf>
  </Document>`;

  return mxOutput;
};

module.exports = xml;
