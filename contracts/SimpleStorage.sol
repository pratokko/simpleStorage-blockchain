// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

contract SimpleStorage {
    uint256  favoriteNumber;

    mapping(string => uint256) public NameToFavoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }
  
    People[] public person;

    function addPerson ( string memory _name, uint256 _favoriteNumber) public {
        person.push(People(_favoriteNumber, _name));
        NameToFavoriteNumber[_name] = _favoriteNumber;
     
    }
 
    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve () public view returns (uint256) {
        return favoriteNumber;
    }

}