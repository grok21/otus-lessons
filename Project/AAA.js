const Web3 = require('web3');
let web3 = new Web3("http://127.0.0.1:8545");

async function accs() {
  const acccs = await web3.eth.getAccounts();
  console.log(acccs);

  const transaction = await web3.eth.getTransaction('0x44e53fb0cfd1e06f8b092d9ecf0ac5da75ba7c298b0d20efc84e1ab2e59d79b8')
  console.log(transaction);

  return acccs;
}

//accs();

web3.eth.getAccounts().then(a => console.log(a))

web3.eth.getBalance("0x1203d2A5840723F73Aa55358e156E9b015c38AA0")
        .then(balance => {
          console.log(web3.utils.fromWei(balance))
          console.log(balance)
        });

web3.eth.getGasPrice().then(p => console.log('Gas price: ', p));


/*
web3.eth.sendTransaction({
  from: '0x1203d2A5840723F73Aa55358e156E9b015c38AA0',
  to: '0xdDe7a5B794fB383A6D4Bb3E9e673742b352aC985',
  value: '50000000000000000000'
})
.on('transactionHash', hash => console.log(hash))
.on('error', e => console.log(e))
*/

console.log('END');
