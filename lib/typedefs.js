/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} Format
 * @property {string} extension - The file formats's extension
 * @property {string} mime - The file formats's MIME type.
 * @property {(Signature[]|Signature)} [signature] - One or more `Signature` objects. Identity-Stream will only match with this format if all signatures are present in the stream.
 * @property {(Subtype[]|Subtype)} [subtypes] - One or more `Subtype` objects. Identity-Stream will match with this format if any subtype's signature matches.
 */

/**
 * A subtype
 * @typedef {Object} SubType
 * @property {string} name - The name of this subtype
 * @property {(Signature[]|Signature)} signature - One or more `Signature` objects. Identity-Stream will only match with this subtype if all signatures are present in the stream.

/**
 * A signature
 * @typedef {Object} Signature
 * @property {string} value - The signature to check for (in hex format).
 * @property {number} offset - The offset of the signatue in bytes.
 */
