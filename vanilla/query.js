import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

// javascript spurces
// https://docs.marsprotocol.io/docs/develop/contracts-api/contracts-api-intro

const rpc = 'https://rpc-osmosis.keplr.app'; // Osmosis RPC
const contractAddress = 'osmosis-contract-address-here'; // Replace with actual contract address

const start = async () => {
    try {
        const client = new CosmWasmClient(rpc);

        //Single market data Query - This should be adapted based on the actual contract's query methods
        const marketQuery = await client.queryContractSmart(contractAddress, {
            "custom_query": {
                "market": {
                    "denom": "..."
                }
            }
        });

        // json Response
        /*{
            "denom": "...", 
            "max_loan_to_value": 0.123,
            "liquidation_threshold": 0.123,
            "liquidation_bonus": 0.123, 
            "reserve_factor": 0.123, 
            "interest_rate_model": {
                "optimal_utilization_rate": 0.123, 
                "base": 0.123, 
                "slope_1": 0.123, 
                "slope_2": 0.123
            }, 
            "borrow_index": 0.123, 
            "liquidity_index": 0.123, 
            "borrow_rate": 0.123, 
            "liquidity_rate": 0.123, 
            "indexes_last_updated": 123,
            "collateral_total_scaled": 123,
            "debt_total_scaled": 123,
            "deposit_enabled": true, 
            "borrow_enabled": true, 
            "deposit_cap": 123456
        }*/

        const marketsQuery = await client.queryContractSmart(contractAddress, {
            "custom_query": {
                "markets": {
                    "start_after": "...", 
                    "limit": 10
                }
            }
        });

        // lists all markets to the limit

        const userQuery = await client.queryContractSmart(contractAddress, {
            "custom_query": {
                "user_position": {
                    "user": "mars..."
                }
            }
        });

        // Response
        /* 
        {

    "total_enabled_collateral": "123",
    "total_collateralized_debt": "123",
    "weighted_max_ltv_collateral": "123",
    "weighted_liquidation_threshold_collateral": "123",
    "health_status": {
        "max_ltv_hf": 0.123,
        "liq_threshold_hf": 0.123
        }
    }
        */
       // test your queries here: https://celatone.osmosis.zone/osmosis-1/query?contract=osmo1c3ljch9dfw5kf52nfwpxd2zmj2ese7agnx0p9tenkrryasrle5sqf3ftpg
       // users get liquidated for all their positions at once
       // liquidation filterer contract: osmo1v0ezrc0f7l5tlw6ws2r8kalhmvrfhe0fywrmj8kjgrwvud5r83uqywn66c
       // message to be filtered:
       /* 
       {
    "liquidate_many": {
        "liquidations": [
            {
                "collateral_denom": "...", 
                "debt_denom": "...", 
                "user_address": "...", 
                "amount": "12345"
            }, 
            {
                "collateral_denom": "...", 
                "debt_denom": "...", 
                "user_address": "...", 
                "amount": "12345"
            }
        ]
    }
}
       */

        console.log('Contract Query Result:', marketQuery);

    } catch (err) {
        console.error(err);
    }
};
