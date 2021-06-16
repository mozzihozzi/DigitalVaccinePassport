pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

// userUsingCoin 코인 사용처 (검사, 하이패스)

contract userUsingCoinContract {

    uint8 numberOfUserUsingCoinInfos; // 총 제품의 수입니다.
    address contractOwner;

    struct userUsingCoinInfo {
        uint   number;
        string uID;
        string useType; // 어떤 사용처에서 사용하였는가
        uint useCoin;
        uint timestamp;
    }

    userUsingCoinInfo[] public userUsingCoinInfos;

    constructor() public {        
        contractOwner = msg.sender;
    }

    function setUserUsingCoinInfo (uint _initNumber, string _uID, string _useType, uint _useCoin) public {
        userUsingCoinInfos.push(userUsingCoinInfo(_initNumber, _uID, _useType, _useCoin, now)) -1;
        numberOfUserUsingCoinInfos++;
    }

    //제품 등록의 수를 리턴합니다.
    function getUserUsingCoinInfo() public constant returns(uint8) {
        return numberOfUserUsingCoinInfos;
    }
    
    function getALLUserUsingCoinInfos() public view returns (userUsingCoinInfo[]) {
        return userUsingCoinInfos;
    }

    //번호에 해당하는 제품의 이름을 리턴합니다.
    function getUserUsingCoinInfoStruct(uint _index) public view returns (uint, string, string, uint, uint) {
        return (userUsingCoinInfo[_index].number, userUsingCoinInfo[_index].uID, userUsingCoinInfo[_index].useType, userUsingCoinInfo[_index].useCoin, userUsingCoinInfo[_index].timestamp);
    }

    //컨트랙트를 삭제합니다.
    function killContract() public {
        if(contractOwner == msg.sender)
            selfdestruct(contractOwner);
    }
}