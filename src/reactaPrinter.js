import Recta from "recta";
var printer = new Recta("1155", "22339");

export default function onClick() {
  console.log("I am called printer on click", printer);
  try {
    printer
      .open()
      .then(function (err) {
        printer
          .align("center")
          .text("Hello World !!")
          .bold(true)
          .text("This is bold text")
          .bold(false)
          .underline(true)
          .text("This is underline text")
          .underline(false)
          .barcode("CODE39", "123456789")
          .cut()
          .print();
      })
      .catch((err) => {
        console.log("error on printting", err);
      });
  } catch (err) {
    console.log("error", err);
  }
}
