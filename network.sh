#!/bin/bash

# Exit on first error, print all commands.
set -e

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1
starttime=$(date +%s)
CC_RUNTIME_LANGUAGE=golang
CC_SRC_PATH=../chaincode

# clean out any old identities in the wallets
rm -rf ./wallet/*

# launch network; create channel and join peer to channel
pushd ../fabric-samples/test-network
./network.sh down
./network.sh up createChannel -c mychannel -ca
./network.sh deployCC -ccn votingChaincode -ccp $CC_SRC_PATH -ccl go
popd

cat <<EOF
Total setup execution time : $(($(date +%s) - starttime)) secs ...
EOF
