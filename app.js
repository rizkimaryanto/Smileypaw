// Konfigurasi smart contract
const contractAddress = "0xb88b07C80B9e4e2b3c481623edE7978484aC8594";
const abi = [ /* Masukkan ABI Anda di sini (dari file ABI yang diberikan) */ ];

// Web3 setup
let web3;
let contract;
let account;

// Infura setup
const provider = "https://polygon-mainnet.infura.io/v3/4b83836820944bf0bba486179ee4dbfd";

// Inisialisasi tap counter
let tapCount = 0;

// Fungsi saat tap pada paw
document.getElementById("paw").addEventListener("click", () => {
  tapCount++;
  document.getElementById("tap-count").textContent = `Taps: ${tapCount}`;
});

// Fungsi klaim reward
document.getElementById("claim-reward").addEventListener("click", async () => {
  if (!web3) {
    alert("Please connect to MetaMask first!");
    return;
  }

  try {
    const rewardAmount = web3.utils.toWei(tapCount.toString(), "ether"); // 1 tap = 1 token
    await contract.methods.transfer(account, rewardAmount).send({ from: account });
    document.getElementById("reward-status").textContent = `Success! You've claimed ${tapCount} Smileypaw tokens.`;
    tapCount = 0; // Reset tap count
    document.getElementById("tap-count").textContent = "Taps: 0";
  } catch (error) {
    console.error(error);
    document.getElementById("reward-status").textContent = "Failed to claim reward. Try again.";
  }
});

// Fungsi untuk koneksi ke MetaMask
async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await ethereum.request({ method: "eth_requestAccounts" });
    account = (await web3.eth.getAccounts())[0];
    contract = new web3.eth.Contract(abi, contractAddress);
    alert(`Wallet connected: ${account}`);
  } else {
    alert("Please install MetaMask to use this DApp!");
  }
}

// Inisialisasi koneksi
connectWallet();
