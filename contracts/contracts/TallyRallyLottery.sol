// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for ERC20 token to interact with the tokens
interface IERC20 {
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract TallyRallyLottery {
    IERC20 public token;
    uint256 public constant TICKET_PRICE = 1e18; // Assumes the token has 18 decimal places
    uint256 public prizePool;
    address public owner;

    event LotteryEntry(address indexed player);
    event LotteryWin(address indexed winner, uint256 amount);

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
        owner = msg.sender;
    }

    function play() external {
        // Transfer 1 token as a ticket price from the player's address to the contract
        require(
            token.transferFrom(msg.sender, address(this), TICKET_PRICE),
            "Transfer failed"
        );

        // Emit an event that a player has entered
        emit LotteryEntry(msg.sender);

        // 10% chance to win
        if (random() < 10) {
            uint256 prizeAmount = prizePool;
            prizePool = 0; // Reset the prize pool after winning

            // Transfer the prize to the winner
            require(
                token.transfer(msg.sender, prizeAmount),
                "Prize transfer failed"
            );
            emit LotteryWin(msg.sender, prizeAmount);
        } else {
            // Add the ticket price to the prize pool
            prizePool += TICKET_PRICE;
        }
    }

    // Simple pseudo-random number generator
    // WARNING: This is not secure and can be manipulated by miners
    // For a production contract, use a verifiably random function (VRF) like Chainlink VRF
    function random() private view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        msg.sender
                    )
                )
            ) % 100;
    }

    // Function to allow the owner to withdraw tokens
    // This can be used to withdraw tokens that are mistakenly sent to the contract
    // It could also be used to collect fees if the contract charges any
    function withdrawTokens(address to, uint256 amount) external {
        require(msg.sender == owner, "Only the owner can withdraw tokens");
        require(token.transfer(to, amount), "Withdraw failed");
    }
}
