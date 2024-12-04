import React, { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart'

interface TradeBalance {
    date: number // Timestamp of the trade
    balance: number // Account balance after the trade
}

const Chart = ({ data }: { data: TradeBalance[] }) => {
    const spacingMultiplier = 10
    const xData = data.map((_, index) => index * spacingMultiplier)
    const yData = data.map((item) => item.balance)

    const [totalAccountValue, setTotalAccountValue] = useState(0)
    const [totalProfit, setTotalProfit] = useState(0)

    useEffect(() => {
        if (data.length > 0) {
            const lastBalance = data[data.length - 1].balance

            const firstBalance = data[0].balance
            const profit = lastBalance - firstBalance

            setTotalAccountValue(lastBalance)
            setTotalProfit(profit)
        }
    }, [data])

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <div style={{ textAlign: 'center', marginTop: 20 }}>
                <h2>Balance Over Time</h2>
                <div>
                    <h3>
                        Total Account Value: ${totalAccountValue.toFixed(2)}
                    </h3>
                    <h3>Total Profit/Loss: ${totalProfit.toFixed(2)}</h3>
                </div>
            </div>
            <LineChart
                width={1800}
                height={600}
                series={[{ data: yData, label: 'Balance' }]}
                xAxis={[
                    {
                        scaleType: 'time',
                        data: xData,
                        label: 'Date',
                        valueFormatter: (value) =>
                            new Date(value).toLocaleDateString(),
                    },
                ]}
                yAxis={[{}]}
            />
        </div>
    )
}

export default Chart
