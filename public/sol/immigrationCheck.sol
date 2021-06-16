pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

// immigrationCheck 출입국 심사 등록 수수료

contract immigrationCheckContract {

    uint8 numberOfEntryExitInfos; // 총 출입국 심사의 수입니다.
    address contractOwner;

    struct entryexitInfo {
        uint   number;
        string uName;
        string uPID;
        string uCountry;
        string immigrationContry;
        bool entryexitType; // True : entry, False : exit
        uint timestamp;
    }

    entryexitInfo[] public entryexitInfos;

    constructor() public {        
        contractOwner = msg.sender;
    }

    function setEntryExitInfo (uint _initNumber, string _uName, string _uPID, string _uCountry, string _immigrationContry, bool _entryexitType) public {
        entryexitInfos.push(entryexitInfo(_initNumber,_uName,_uPID, _uCountry, _immigrationContry, _entryexitType, now)) -1;
        numberOfEntryExitInfos++;
    }

    //출입국 기록의 수를 리턴합니다.
    function getEntryExitInfo() public constant returns(uint8) {
        return numberOfEntryExitInfos;
    }
    
    function getALLEntryExitInfos() public view returns (entryexitInfo[]) {
        return entryexitInfos;
    }

    //번호에 해당하는 출입국 기록을 리턴합니다.
    function getEntryExitInfoStruct(uint _index) public view returns (uint, string, string, string, string, bool, uint) {
        return (entryexitInfos[_index].number, entryexitInfos[_index].uName, entryexitInfos[_index].uPID, entryexitInfos[_index].uCountry, entryexitInfos[_index]._immigrationContry, entryexitInfos[_index]._entryexitType, entryexitInfos[_index].timestamp);
    }

    //컨트랙트를 삭제합니다.
    function killContract() public {
        if(contractOwner == msg.sender)
            selfdestruct(contractOwner);
    }
}