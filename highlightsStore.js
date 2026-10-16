// ─── HIGHLIGHTS STORE ────────────────────────────────────────────────────────
// Centralized store for personal book/chapter highlights with subscription support.

class HighlightsStore {
  constructor() {
    this.listeners = new Set();
    // Pre-populate with initial curated personal highlights
    this.highlights = [
      {
        id: 'hl-1',
        bookId: '1',
        bookName: 'Atomic Habits',
        chapterId: 'c1',
        chapterName: 'Ch 1: The Power of Tiny Gains',
        postId: 'p1',
        postIndex: 1,
        pageNum: 1,
        text: "If you can get 1 percent better each day for one year, you'll end up thirty-seven times better by the time you're done.",
        timestamp: 'Yesterday at 9:42 PM',
      },
      {
        id: 'hl-2',
        bookId: '1',
        bookName: 'Atomic Habits',
        chapterId: 'c1',
        chapterName: 'Ch 1: The Power of Tiny Gains',
        postId: 'p1',
        postIndex: 1,
        pageNum: 2,
        text: 'Habits are the compound interest of self-improvement. The same way that money multiplies through compound interest, the effects of your habits multiply as you repeat them.',
        timestamp: 'Today at 8:15 AM',
      },
      {
        id: 'hl-3',
        bookId: '1',
        bookName: 'Atomic Habits',
        chapterId: 'c2',
        chapterName: 'Ch 2: Identity-Based Habits',
        postId: 'p1',
        postIndex: 1,
        pageNum: 2,
        text: 'The goal is not to read a book, the goal is to become a reader. The goal is not to run a marathon, the goal is to become a runner.',
        timestamp: 'Today at 10:04 AM',
      },
    ];
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.highlights);
      } catch (e) {
        console.error('Error notifying highlight listener:', e);
      }
    });
  }

  getAll() {
    return [...this.highlights];
  }

  getByChapter(chapterTitleOrId) {
    if (!chapterTitleOrId) return [];
    const query = chapterTitleOrId.toLowerCase().trim();
    return this.highlights.filter(
      (h) =>
        (h.chapterId && h.chapterId.toLowerCase() === query) ||
        (h.chapterName && h.chapterName.toLowerCase().includes(query)) ||
        (query.includes(h.chapterName ? h.chapterName.toLowerCase() : ''))
    );
  }

  getByPost(bookName, chapterName, postIndex) {
    return this.highlights.filter(
      (h) =>
        h.bookName?.toLowerCase() === bookName?.toLowerCase() &&
        h.chapterName?.toLowerCase() === chapterName?.toLowerCase() &&
        Number(h.postIndex) === Number(postIndex)
    );
  }

  isPageHighlighted(bookName, chapterName, postIndex, pageNum) {
    return this.highlights.some(
      (h) =>
        h.bookName?.toLowerCase() === bookName?.toLowerCase() &&
        h.chapterName?.toLowerCase() === chapterName?.toLowerCase() &&
        Number(h.postIndex) === Number(postIndex) &&
        Number(h.pageNum) === Number(pageNum)
    );
  }

  togglePageHighlight({ bookId, bookName, chapterId, chapterName, postId, postIndex, pageNum, text }) {
    const existingIndex = this.highlights.findIndex(
      (h) =>
        h.bookName?.toLowerCase() === bookName?.toLowerCase() &&
        h.chapterName?.toLowerCase() === chapterName?.toLowerCase() &&
        Number(h.postIndex) === Number(postIndex) &&
        Number(h.pageNum) === Number(pageNum)
    );

    if (existingIndex >= 0) {
      // Remove highlight
      this.highlights.splice(existingIndex, 1);
      this.notify();
      return false; // now unhighlighted
    } else {
      // Add highlight
      const newHighlight = {
        id: `hl-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        bookId: bookId || '1',
        bookName: bookName || 'Book',
        chapterId: chapterId || 'c1',
        chapterName: chapterName || 'Chapter',
        postId: postId || `p${postIndex || 1}`,
        postIndex: postIndex || 1,
        pageNum: pageNum || 1,
        text: text ? text.trim() : 'Highlighted passage',
        timestamp: 'Just now',
      };
      this.highlights = [newHighlight, ...this.highlights];
      this.notify();
      return true; // now highlighted
    }
  }

  deleteHighlight(id) {
    this.highlights = this.highlights.filter((h) => h.id !== id);
    this.notify();
  }
}

export const highlightsStore = new HighlightsStore();
