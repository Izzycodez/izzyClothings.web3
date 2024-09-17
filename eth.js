 import { ethers } from "./ethers-5.6.esm.min.js"
 import { abi } from "./constants.js"
 import { contractAddress } from "./constants.js"

 const connectBtn = document.getElementById("connect")
 const payBtn = document.getElementById("pay")


 connectBtn.onclick = connect
 payBtn.onclick = pay

 console.log( ethers)
async function connect(){
    if (typeof window.ethereum !== "undefined"){
        try{ await window.ethereum.request({method :"eth_requestAccounts"})
        }catch (err){
            console.log(err)
        }
        document.getElementById('result').textContent='you are connected 😎💲💵'
        console.log("connected...")
    }else{
        document.getElementById('result').textContent='you don\'t have metamask..!'
        console.log("download metamask...!")
    }
}

async function pay(){
    let amountToPay = document.getElementById("amount").value
    amountToPay =amountToPay.toString()
    console.log(typeof amountToPay)
    console.log('You are about to send some eth..!')
    let response = prompt(`You are about to send ${amountToPay} eth..!
    continue? yes or no`)
    response= response.toLowerCase()
    alert(response)
    if(response === 'yes'){
        if (typeof window.ethereum !== "undefined"){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, signer)
            try{
            const transactionResponse = await contract.pay({
                value: ethers.utils.parseEther(amountToPay),
            })
            await printResponse(transactionResponse, provider)
            document.getElementById('result').textContent=`Successful...! 👏🏽 🤝🏽
            You have successfully paid ${amountToPay} eths 
            
            Thanks for the patronage`
             } catch (err){
                console.log(err)
            }
        }
    }
   
    document.getElementById("amount").value = ''
}

function printResponse(transactionResponse, provider) {
    return new Promise ((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) =>{
            alert('payment successful')
           
            resolve()
        })
       
    }) 

}

/*async function withdraw() {
    if (typeof window.ethereum !== "undefined"){
        providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, signer)
        try{
            const transactionResponse = await contract.wi
        } catch(error) {
            console.log(error)
        }
   
    }
}*/