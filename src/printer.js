const escpos = require("escpos");
// install escpos-usb adapter module manually
escpos.USB = require("escpos-usb");
// Select the adapter based on your printer type
import { createElementsFromText } from "html-text-to-react";

function doPrinting() {
  const device = new escpos.USB(1155, 22339);
  const printer = new escpos.Printer(device);

  const cartItems = [
    { category: "test", price: 80, quantityToSell: 2, title: "Hosting" },
    { category: "test1", price: 820, quantityToSell: 63, title: "Mouse" },
    { category: "test00", price: 60, quantityToSell: 20, title: "Sale" },
    {
      category: "dvhfgnfgjfjg",
      price: 20,
      quantityToSell: 8,
      title: "Keyboards",
    },
    { category: "dvhfgnfgjfjg", price: 10, quantityToSell: 4, title: "Keyss" },
    { category: "dvhfgnfgjfjg", price: 70, quantityToSell: 1, title: "Test" },
    {
      category: "dvhfgnfgjfjg",
      price: 500,
      quantityToSell: 12,
      title: "Whale oil",
    },
    {
      category: "dvhfgnfgjfjg",
      price: 560,
      quantityToSell: 22,
      title: "Papers",
    },
  ];

  // get total per line items
  const totalPerItemList = (item) => {
    let totalPerItem = 0;

    totalPerItem = item.quantityToSell * item.price;

    return totalPerItem;
  };

  // get the total price
  let total = 0;
  for (let cartItem of cartItems) {
    var unitSum = cartItem.quantityToSell * cartItem.price;
    total += unitSum;
  }

  const TestTable = `
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Testing Title for table</title>            
            </head>   
            <body>
                <div class="invoice-box">
                    <table class="receipt-table" cellpadding="0" cellspacing="0" border="0">
                        <thead>
                            <tr class="heading">
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${cartItems.map(
                              (item) =>
                                `
                                    <tr>
                                        <td>${item.title}</td>
                                        <td>${item.quantityToSell}</td>
                                        <td>${item.price}</td>
                                        <td>${totalPerItemList(item)}</td>
                                    </tr>
                                `
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    TOTAL:<td/><td/><td/>${total}
                                </td>
                            </tr>                                                   
                        </tfoot>
                </table>
                </div>            
            </body>     
        </html>
        `;

  const text = createElementsFromText(TestTable);

  console.log(text);

  device.open(function (err) {
    printer.font("A").align("CT").size(1).text("#Sathi POS").newLine();
    printer
      .font("A")
      .align("CT")
      .size(1)
      .text("Aama's Bakery")
      .color(1)
      .newLine();

    printer.font("A").align("LT").size(1).text(`Bill No. ${12345}`);
    printer
      .font("A")
      .align("LT")
      .size(1)
      .text(`Date : ${new Date().toDateString()}`);
    printer.font("A").align("LT").size(1).text(`Table no. ${1245}`);
    printer.text("Order Listings").size(2);
    printer.drawLine();
    printer.text(text).font("B");

    printer.drawLine();
    printer.size(2).align("CT").text("Thank You!").newLine();
    printer.drawLine();

    printer.cut().close();
  });
}

export default doPrinting;
