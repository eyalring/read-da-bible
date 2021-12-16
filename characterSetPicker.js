const charset = ['a','b','-']
module.exports = (characterToFilter) => {
    return (!/[^a-zA-Z]/.test(characterToFilter))
}