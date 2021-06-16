const { web3 } = window
// const fs = require('fs')
const selectedAddress = web3.eth.defaultAccount
const accountFilePath = "../json/accounts.json"


$(document).ready(function() {
	// ------------------------------- Contract Informations ------------------------------
	// ---  user reward solidity file information
    const userRewardContractAddress = '';
    const userRewardContractABI = []
	
	// --- smartcontract vaccination solidity file information
	const vaccinationContractAddress = '';
    const vaccinationContractABI = [];
	
	// --- smartcontract immigration check solidity file information
	const immigrationCheckContractAddress = '';
    const immigrationCheckContractABI = [];

	// --- user using coins for benefits solidity file information
	const userUsingCoinContractAddress = '';
    const userUsingCoinContractABI = [];

	// -----------------------------------------------------------------------------

    $('#linkHome').click(function() { showView("viewHome") });
    $('#linkSubmitDocument').click(function() { showView("viewSubmitDocument"); showTable();  });
    $('#linkVerifyDocument').click(function() { showView("viewVerifyDocument") });
    $('#itemUploadButton').click(itemUploadButton);
    $('#showTableButton').click(showTable);

	/*

	*/

	// -------------------------------- Contract Links ------------------------------
	// --- userRewardContractLink
    $('#userRewardContractLink').text(userRewardContractAddress);
    $('#userRewardContractLink').attr('href', 'https://ropsten.etherscan.io/address/' + userRewardContractAddress);
	
	// --- vaccinationContractLink
	$('#vaccinationContractLink').text(vaccinationContractAddress);
    $('#vaccinationContractLink').attr('href', 'https://ropsten.etherscan.io/address/' + vaccinationContractAddress);

	// --- immigrationCheckContractLink
	$('#immigrationCheckContractLink').text(immigrationCheckContractAddress);
    $('#immigrationCheckContractLink').attr('href', 'https://ropsten.etherscan.io/address/' + immigrationCheckContractAddress);

	// --- userUsingCoinContractLink
	$('#userUsingCoinLink').text(userUsingCoinContractAddress);
    $('#userUsingCoinLink').attr('href', 'https://ropsten.etherscan.io/address/' + userUsingCoinContractAddress);

	// -----------------------------------------------------------------------------

    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function() { $("#loadingBox").show() },
        ajaxStop: function() { $("#loadingBox").hide() }    
    });
    
    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();
    }
    
    function showInfo(message) {
        $('#infoBox>p').html(message);
        $('#infoBox').show();
        $('#infoBox>header').click(function(){ $('#infoBox').hide(); });
    }

    function showError(errorMsg) {
        $('#errorBox>p').html("Error: " + errorMsg);
        $('#errorBox').show();
        $('#errorBox>header').click(function(){ $('#errorBox').hide(); });
    }

	// --- save account info to path // NOT USED
	// function saveUserAccount(_id, _passwd){
	// 	const fs = require('fs')
	// 	const account = {
	// 		id : _id,
	// 		passwd : _passwd
	// 	}

	// 	fs.writeFileSync('../json/account.json', JSON.stringify)
	// }

	// --- load account info from path // NOT USED
	// function loadUserAccount(){
	// 	// loading json file
	// 	//if not loaded file -> err

		
	// }	

	// --- user log list
	async function showTable() {
        // $('#viewSubmitDocument>table').html( );
        // $('#viewSubmitDocument').show();

		if (window.ethereum)
			try {
				await window.ethereum.enable();
			} catch (err) {
                return showError("Access to your Ethereum account rejected.");
			}
		if (typeof web3 === 'undefined')
                return showError("Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.");
		
		//------------------------------------- contract settings
		// --- contract for user reward
		let contractUserReward = web3.eth.contract(userRewardContractABI).at(userRewardContractAddress);
		
		// --- contract for vaccination // TODO
		let contractVaccination = web3.eth.contract(vaccinationContractABI).at(vaccinationContractAddress); 
		
		// --- contract for immigration check // TODO
		let contractImmigrationCheck = web3.eth.contract(immigrationCheckContractABI).at(immigrationCheckContractAddress); 
		
		// --- contract for user benefits // TODO
		let contractUserUsingCoin = web3.eth.contract(userUsingCoinContractABI).at(userUsingCoinContractAddress); 

		$('#myTable').append(  '<table>' );
		
		//--- functions in User Rewaurd
		// get products log
		contract.getNumOfProducts(function(err, result) {
			if (err)
				return showError("Smart contract call failed: " + err);

				
			// showInfo(`Document ${result} <b>successfully added</b> to the registry.`);
			console.log("length: " + result);
			
			for (let i = 0; i < result; i++) {

				contract.getProductStruct(i, function(err, product) {

					console.log("product: " + product);

					let toString = product.toString();
					// console.log("product: " + toString);
					let strArray = toString.split(",");

					let timestamp = new Date(strArray[3]*1000);
					console.log("timestamp: " + timestamp);
					console.log("timestamp: " + strArray[3]*1000);

					// let row = table.insertRow();
					// let cell1 = row.insertCell(0);
					// let cell2 = row.insertCell(1);
					// let cell3 = row.insertCell(2);
					// let cell4 = row.insertCell(3);
					// cell1.innerHTML = strArray[0];
					// cell2.innerHTML = strArray[1];
					// cell3.innerHTML = strArray[2];
					// cell4.style.width ="60%";
					// cell4.innerHTML = timestamp;

					$('#myTable').append( '<tr><td>' + strArray[0] + ", "+ strArray[1] + ", "+ strArray[2] + ", "+ timestamp  + '</td></tr>' );

				})  // end of get

			} // end of for

		}); 

		// for(i=0;i<3;i++){
		// 	$('#myTable').append( '<tr><td>' + 'result' +  i + '</td></tr>' );
		// }		

 		$('#myTable').append(  '</table>' );

    }
    
	async function showTable() {

	}


    async function itemUploadButton() {
        // if ($('#documentForUpload')[0].files.length == 0)
            // return showError("Please select a file to upload.");

		if (window.ethereum)
			try {
				await window.ethereum.enable();
			} catch (err) {
                return showError("Access to your Ethereum account rejected.");
			}
		if (typeof web3 === 'undefined')
                return showError("Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.");
		
		let account = selectedAddress 
		console.log("my account " , account);
		
		let howMany = $("#pronumber").val();
		console.log("howMany " , howMany);

		let productName = $("#proname").val();
		console.log("productName " , productName);

		let whereIs = $("#proloc").val();
		console.log("whereIs " , whereIs);
		
		let contract = web3.eth.contract(productRegistryContractABI).at(productRegistryContractAddress);

		contract.addProStru(howMany, productName, whereIs, function(err, result) {
			if (err)
				return showError("Smart contract call failed: " + err);
			showInfo(`Document ${result} <b>successfully added</b> to the registry.`);
		}); 
		
    }

    function verifyDocument() {
		
		
		if (typeof web3 === 'undefined')
                return showError("Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.");
			
		let account = selectedAddress 
		console.log("my account " , account);
		

 
    }
});
