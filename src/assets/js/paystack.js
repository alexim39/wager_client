function payWithPaystack(depositObj) {
    //e.preventDefault();

    let handler = PaystackPop.setup({
      key: 'pk_test_4366ca52f9e1ff5c5b32f122c69ef8bcc1eaca7c', // Replace with your public key
      email: depositObj.email,
      amount: depositObj.amount * 100,
      ref: depositObj.transactionId.toString(), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: () => {
        //alert('Window closed.');
        return;
      },
      callback: (response) => {
        //let message = 'Payment complete! Reference: ' + response.reference;
        //window.location = `http://localhost:4201/api/deposit/verify/${response.reference}/${depositObj.userId}`;
        $.ajax({
            url: `http://localhost:4201/api/deposit/verify/${response.reference}/${depositObj.userId}`,
            method: 'get',
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", 'Bearer sk_test_b441baf1041718a36f921848b12d804e11e7abc9');
              },
            success: (response) => {
              // the transaction status is in response.data.status
              //console.log(response)

              //reload page
              location.reload();
            }
          });
      }
    });
    handler.openIframe();
}