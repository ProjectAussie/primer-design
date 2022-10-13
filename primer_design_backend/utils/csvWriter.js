const createCsvWriter = require('csv-writer').createArrayCsvWriter

const initOrderFormCsvWriter = (fileName) => createCsvWriter({
    path: `./files/${fileName}`,
    header: ['Name', 'Sequence', 'Scale', 'Purification']
})

const findPrimerPair = (primerPairs, id) => {
    return primerPairs.find( (primerPair) => primerPair._id.toString() === id)
}

const namePrimer = (position, healthId, index) => {
    if (position === 'left'){
        return `EV_${healthId}_F${index}`
    }
    else if (position === 'right'){
        return `EV_${healthId}_R${index}`
    }
}

const writeOrderForm = (shoppingCart) => {
    const csvWriter = initOrderFormCsvWriter('primer_order_form.csv')
    let records = []
    shoppingCart.forEach( (shoppingCartEntry) => {
        const {primerSet, primerPairIds} = shoppingCartEntry
        const healthId = primerSet.designParameters.standard.healthId
        primerPairIds.forEach( (primerPairId, index) => {
            const primerPair = findPrimerPair(primerSet.primerPairs, primerPairId)
            const leftSequence = primerPair.leftPrimer.sequence
            const leftName = namePrimer('left', healthId, index)
            records.push([leftName, leftSequence])
            const rightSequence = primerPair.rightPrimer.sequence
            const rightName = namePrimer('right', healthId, index)
            records.push([rightName, rightSequence])
        })
    })
    return csvWriter.writeRecords(records)
}

const csvWriter = {
    writeOrderForm,
}

module.exports = csvWriter