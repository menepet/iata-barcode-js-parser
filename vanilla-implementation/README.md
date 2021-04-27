<p align="center">
  <img width="460" height="300" src="iata-logo.png">
</p>

> JavaScript parser for International Air Transport Association (IATA) barcode from user's boarding pass #

#### ⚠️ Based on BCBP(BAR CODE BOARDING PASS)- [BCBP-Implementation-Guide-5th-Edition-June-2016](https://www.iata.org/contentassets/1dccc9ed041b4f3bbdcf8ee8682e75c4/2021_03_02-bcbp-implementation-guide-version-7-.pdf)


**👀 Live Demo: [https://menepet.github.io/iata-barcode-js-parser](https://menepet.github.io/iata-barcode-js-parser/)**
> You can use this test iata barcode: M1MICHEL/GEORGE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E6C2KLS&nbsp;ATHTORAC&nbsp;1903&nbsp;0114&nbsp;185Y009A0013&nbsp;147>218&nbsp;&nbsp;W&nbsp;&nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;29

The security field (after 158 chars barcode length) is a separate field that enables a third party to verify that the bar code data was
not tampered with.
The security field is optional and to be used only when required by the local security
administration. Typically, this field may contain a digital signature of variable length, the length of
the field and a type of security data (that defines the algorithm used). IATA is only providing the
structure for the signature to be stored in the bar code.
The bar code data (mandatory, optional and individual airline use fields) remain unchanged and
can be read regardless of the digital signature.

## 🚀 Usage

* `git clone <repository-url>` this repository
* `cd iata-barcode-js-parser/`
* Open `index.html` with a local web server


<!-- https://www.codereadr.com/blog/scanning-iata-bar-coded-boarding-pass-bcbp/ -->
<!-- https://shaun.net/notes/whats-contained-in-a-boarding-pass-barcode/ -->
<!-- https://javadude.wordpress.com/2017/10/07/whats-in-my-boarding-pass-barcode/ -->

<!-- ^([A-Z0-9]{2})([A-Z]+\/[A-Z]+)\s*([A-Z0-9]+)\s*([A-Z]{3})([A-Z]{3})([A-Z]{2})\s*([0-9]+)\s+([A-Z0-9]+)\s+([A-Z0-9]+)>?(.*?)\s*(.*?)\s*(.*?)$ -->

<!-- M1SMITH/JOHN EHJK345 FRASINLH  3456 280C015A0001 100
M1SMITH/JOHN ECV7UGB MLADXBEK  0110 321J010K0072 337>1082WO6321B291762184866292 EK 447730916
M1MICHEL/GEORGE E6C2KLS ATHTORAC 1903 0114 185Y009A0013 147>218  W    B                29
M1LEOPOLD/EMR EZQ7O92 GVALHRBA 00723319C002F00009100

M1MICHEL/GEORGE       E6C2KLS ATHTORAC 1903 0114 185Y009A0013 147>218  W    B                29 -->