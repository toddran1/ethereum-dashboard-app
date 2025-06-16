export const MESSAGE_BOARD_ADDRESS = "0x3baabdf22c004e142168d52e0efc1eab7602b999";



export const MESSAGE_BOARD_ABI = [
  {
    "inputs": [],
    "name": "message",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_msg", "type": "string" }
    ],
    "name": "setMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
