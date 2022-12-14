const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'Gladiator06',
    port: 5432,
})

const getMerchants = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM material ORDER BY id ASC', (error, results) => {
            if(error) {
                reject(error)
            }
            resolve(results.rows)
        })
    })
}


const createMerchant = (body) => {
    return new Promise(function(resolve, reject) {
      const { id, name, type, image, price, amount, minAmount, packAmount, typeLength } = body
      pool.query('INSERT INTO material (name, type) VALUES ($1, $2) RETURNING *', [id, name, type, image, price, amount, minAmount, packAmount, typeLength], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new merchant has been added added: ${results.rows[0]}`)
      })
    })
}


const deleteMerchant = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Merchant deleted with ID: ${id}`)
      })
    })
  }
  

module.exports = {
    getMerchants,
    createMerchant,
    deleteMerchant,
}