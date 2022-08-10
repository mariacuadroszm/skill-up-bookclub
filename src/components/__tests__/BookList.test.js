import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import BookList from "../BookList.vue";

describe("Testing UI: Book List", () => {
  test("Should render 5 bookcards", () => {
    const wrapper = mount(BookList, {
      props: {
        books: [
          {
            book: {
              id: 1,
              title: "In Search of Lost Time",
              author: "Marcel Proust",
              participants: 3,
            },
          },
          {
            book: {
              id: 2,
              title: "In Search of Lost Time",
              author: "Marcel Proust",
              participants: 3,
            },
          },
          {
            book: {
              id: 3,
              title: "In Search of Lost Time",
              author: "Marcel Proust",
              participants: 3,
            },
          },
          {
            book: {
              id: 4,
              title: "In Search of Lost Time",
              author: "Marcel Proust",
              participants: 3,
            },
          },
          {
            book: {
              id: 5,
              title: "In Search of Lost Time",
              author: "Marcel Proust",
              participants: 3,
            },
          },
        ],
      },
    });

    const bookcard = wrapper.findAll('[data-testid="bookcard"]');

    expect(bookcard.length).toBe(5);
  });

  test("Should render the buttons", () => {
    const wrapper = mount(BookList, {
      props: {
        books: [
          {
            book: {
              id: 1,
              title: "In Search of Lost Time",
              author: "Marcel Proust",
              participants: 3,
            },
          },
        ],
      },
    });

    const showAllBtn = wrapper.find('[data-testid="show-all-button"]');
    const proposeBookBtn = wrapper.find('[data-testid="propose-book-button"]');

    expect(showAllBtn.exists()).toBe(true);
    expect(proposeBookBtn.exists()).toBe(true);
  });

  test("Does not render the 'Propose a book' button when the book list is for active books", () => {
    const wrapper = mount(BookList, {
      props: {
        books: [
          {
            book: {
              id: 1,
              title: "In Search of Lost Time",
              author: "Marcel Proust",
              participants: 3,
            },
          },
        ],
        displayProposeBtn: false,
      },
    });

    const proposeBookBtn = wrapper.find('[data-testid="propose-book-button"]');

    expect(proposeBookBtn.exists()).toBe(false);
  });

  test("Does not render the 'Show All' button when there are no proposed books", () => {
    const wrapper = mount(BookList, {
      props: { books: [] },
    });

    const showAllBtn = wrapper.find('[data-testid="show-all-button"]');

    expect(showAllBtn.exists()).toBe(false);
  });

  test("Does not render a message when there are no proposed or active books", () => {
    const wrapper = mount(BookList, {
      props: {
        books: [
          {
            book: {
              id: 1,
              title: "In Search of Lost Time",
              author: "Marcel Proust",
              participants: 3,
            },
          },
        ],
      },
    });

    const noBooksMsg = wrapper.find('[data-testid="no-books-message"]');
    expect(noBooksMsg.exists()).toBe(false);
  });

  test("Should render a message when there are no proposed or active books", () => {
    const wrapper = mount(BookList, {
      props: { books: [] },
    });

    const noBooksMsg = wrapper.find('[data-testid="no-books-message"]');
    expect(noBooksMsg.exists()).toBe(true);
  });
});
