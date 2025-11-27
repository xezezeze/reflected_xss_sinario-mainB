const express = require('express');
const router = express.Router();
const he = require('he');

router.get('/', (req, res) => {
    const layout = req.app.locals.layout;
    const rawInput = req.query.inputSearch || '';
    const inputSearch = he.encode(rawInput);

  res.send(layout('home', `
    <div class="card">
      <h2>검색 페이지</h2>
      <form method="get" action="/">
        <input type="text" name="inputSearch" value="${inputSearch}" placeholder="검색어 입력" />
        <button type="submit">검색</button>
      </form>

      <h3>검색어 미리보기</h3>
      <p class="preview">${inputSearch}</p>
    </div>
  `));
});

module.exports = router;