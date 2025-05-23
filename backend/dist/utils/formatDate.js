"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
function formatDate(date) {
    const [month, day, year] = date.split('/');
    const monthName = months[parseInt(month, 10) - 1];
    return `${day} ${monthName}`;
}
