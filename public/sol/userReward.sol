pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

// userReward 백신 접종과 출입국 심사에 따른 보상(시스템이 지급)

contract userRewardContract {

    uint8 numberOfUserRewardInfos; // 총 제품의 수입니다.
    address contractOwner;

    struct userRewardInfo {
        uint   number;
        string uID;
        string rewardType; // 백신 접종과 출입국 심사 중 어떤 것으로 보상을 획득하였는가
        uint rewardCoin;
        uint timestamp;
    }

    userRewardInfo[] public userRewardInfos;

    constructor() public {        
        contractOwner = msg.sender;
    }

    function setUserRewardInfo (uint _initNumber, string _uID, string _RewardType, uint _rewardCoin) public {
        userRewardInfos.push(userRewardInfo(_initNumber, _uID, _RewardType, _rewardCoin, now)) -1;
        numberOfUserRewardInfos++;
    }

    //제품 등록의 수를 리턴합니다.
    function getUserRewardInfo() public constant returns(uint8) {
        return numberOfUserRewardInfos;
    }
    
    function getALLUserRewardInfos() public view returns (userRewardInfo[]) {
        return userRewardInfos;
    }

    //번호에 해당하는 제품의 이름을 리턴합니다.
    function getUserRewardInfoStruct(uint _index) public view returns (uint, string, string, uint, uint) {
        return (userRewardInfos[_index].number, userRewardInfos[_index].uID, userRewardInfos[_index].rewardType, userRewardInfos[_index].rewardCoin, userRewardInfos[_index].timestamp);
    }

    //컨트랙트를 삭제합니다.
    function killContract() public {
        if(contractOwner == msg.sender)
            selfdestruct(contractOwner);
    }
}