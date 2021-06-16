pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

// vaccination 백신 접종 등록 수수료

contract vaccinationContract {

    uint8 numberOfVaccineInfos; // 총 제품의 수입니다.
    address contractOwner;

    struct vaccineInfo {
        uint   number;
        string uName;
        string uPID;
        string uCountry;
        string vaccineType;
        uint vaccinationLevel;
        uint timestamp;
    }

    vaccineInfo[] public vaccineInfos;

    constructor() public {        
        contractOwner = msg.sender;
    }

    function setVaccineInfo (uint _initNumber, string _uName, string _uPID, string _uCountry, string _vaccineType, uint _vaccinationLevel) public {
        vaccineInfos.push(vaccineInfo(_initNumber,_uName,_uPID, _uCountry, _vaccineType, _vaccinationLevel, now)) -1;
        numberOfVaccineInfos++;
    }

    //제품 등록의 수를 리턴합니다.
    function getVaccineInfo() public constant returns(uint8) {
        return numberOfVaccineInfos;
    }
    
    function getALLVaccineInfos() public view returns (vaccineInfo[]) {
        return vaccineInfos;
    }

    //번호에 해당하는 제품의 이름을 리턴합니다.
    function getVaccineInfoStruct(uint _index) public view returns (uint, string, string, string, string, uint, uint) {
        return (vaccineInfo[_index].number, vaccineInfo[_index].uName, vaccineInfo[_index].uPID, vaccineInfo[_index].uCountry, vaccineInfo[_index].vaccineType, vaccineInfo[_index].vaccinationLevel, vaccineInfo[_index].timestamp);
    }

    //컨트랙트를 삭제합니다.
    function killContract() public {
        if(contractOwner == msg.sender)
            selfdestruct(contractOwner);
    }
}