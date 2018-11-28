const path = require('path');

export default class PagesController {
    static getHomePage(req, res) {
        res.sendFile(path.resolve('public/ui/index.html'));
    }
    static getPage(req, res) {
        res.sendFile(path.resolve(`public/ui/pages/${req.params.page}`));
    }
}