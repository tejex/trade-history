import React, { Dispatch, SetStateAction } from 'react'
import Papa from 'papaparse'

interface TradeBalance {
    date: number // Timestamp of the trade
    balance: number // Account balance after the trade
}
interface UploadCSVProps {
    setData: Dispatch<SetStateAction<TradeBalance[]>>
}
const parseCSV = (file: File): Promise<{ date: number; balance: number }[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const data = results.data as any[]
                const parsedData: { date: number; balance: number }[] = []
                const startingBalance = 10000

                for (const row of data) {
                    const dateString = row['Time']?.trim()
                    if (!dateString) {
                        console.error('Missing date string in row:', row)
                        continue
                    }

                    const isoDateString = dateString.replace(' ', 'T')
                    const date = new Date(isoDateString)
                    if (isNaN(date.getTime())) {
                        console.error('Invalid Date:', isoDateString)
                        continue
                    }

                    const balanceAfter = parseFloat(row['Balance After'])
                    if (isNaN(balanceAfter)) {
                        console.error(
                            'Invalid Balance After:',
                            row['Balance After']
                        )
                        continue
                    }

                    parsedData.push({
                        date: date.getTime(),
                        balance: balanceAfter,
                    })
                }

                parsedData.sort((a, b) => a.date - b.date)

                if (parsedData.length > 0) {
                    parsedData.unshift({
                        date: parsedData[0].date - 1,
                        balance: startingBalance,
                    })
                }

                resolve(parsedData)
            },
            error: (error) => {
                reject(error)
            },
        })
    })
}

const UploadCSV: React.FC<UploadCSVProps> = ({ setData }) => {
    const handleFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files) {
            const file = event.target.files[0]
            try {
                const parsedData = await parseCSV(file)
                setData(parsedData)
                console.log(parsedData)
            } catch (error) {
                console.error('Error parsing CSV:', error)
            }
        }
    }

    return <input type="file" accept=".csv" onChange={handleFileUpload} />
}

export default UploadCSV
