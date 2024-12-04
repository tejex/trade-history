import React, { useState } from 'react'
import UploadCSV from './UploadCSV'
import Chart from './Chart'

interface TradeBalance {
    date: number // Timestamp of the trade
    balance: number // Account balance after the trade
}

function App() {
    const [data, setData] = useState<TradeBalance[]>([])

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Trading Data Visualizer</h1>
                <UploadCSV setData={setData} />
            </div>
            {data.length > 0 ? (
                <Chart data={data} />
            ) : (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <p>Please upload a CSV file to see the chart.</p>
                </div>
            )}
        </div>
    )
}

export default App
