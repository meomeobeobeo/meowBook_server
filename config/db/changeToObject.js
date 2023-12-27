// data is a mongo docs
function change_Mutil_data_toOBject(docs) {
    docs = docs.map((doc) => doc.toObject())
    return docs
}
function change_one_toObject(doc) {
    doc = doc.toObject()
    return doc
}
export { change_one_toObject, change_Mutil_data_toOBject }
