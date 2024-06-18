package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}

type Voter struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Address string `json:"address"`
	Age     int    `json:"age"`
}

func (s *SmartContract) AddVoter(ctx contractapi.TransactionContextInterface, id string, name string, address string, age int) error {
	voter := Voter{
		ID:      id,
		Name:    name,
		Address: address,
		Age:     age,
	}
	voterJSON, err := json.Marshal(voter)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(id, voterJSON)
}

func (s *SmartContract) EditVoter(ctx contractapi.TransactionContextInterface, id string, name string, address string, age int) error {
	voter := Voter{
		ID:      id,
		Name:    name,
		Address: address,
		Age:     age,
	}
	voterJSON, err := json.Marshal(voter)
	if err != nil {
		return err
	}
	return ctx.GetStub().PutState(id, voterJSON)
}

func (s *SmartContract) DeleteVoter(ctx contractapi.TransactionContextInterface, id string) error {
	return ctx.GetStub().DelState(id)
}

func (s *SmartContract) GetVoter(ctx contractapi.TransactionContextInterface, id string) (*Voter, error) {
	voterJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, err
	}
	if voterJSON == nil {
		return nil, fmt.Errorf("voter %s does not exist", id)
	}

	var voter Voter
	err = json.Unmarshal(voterJSON, &voter)
	if err != nil {
		return nil, err
	}

	return &voter, nil
}

func main() {
	chaincode, err := contractapi.NewChaincode(new(SmartContract))
	if err != nil {
		fmt.Printf("Error create votingChaincode: %s", err.Error())
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting votingChaincode: %s", err.Error())
	}
}
