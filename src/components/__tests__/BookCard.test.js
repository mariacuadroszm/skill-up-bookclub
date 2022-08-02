// TODO: Find out the difference between mount and shallowMount
import { mount } from "@vue/test-utils";
import BookCard from "../BookCard.vue";
import { assert, describe, expect, it, test } from "vitest";

describe("Testing UI: BookCard", () => {
  test("Should render the correct values in the right places and button text when isReader is true and the participant hasn't joined", () => {
    const wrapper = mount(BookCard, {
      props: {
        book: {
          title: "Matar a un ruiseñor",
          participants: 8,
          author: "Leslie y Mar",
        },
        isReader: true,
      },
    });
    assert.equal(
      wrapper.element.querySelector('[data-testid="title"]').innerHTML,
      "Matar a un ruiseñor"
    );
    assert.equal(
      wrapper.element.querySelector('[data-testid="author"]').innerHTML,
      "Leslie y Mar"
    );
    expect(
      wrapper.element.querySelector('[data-testid="participants"]').innerHTML
    ).toMatch("8 Readers");

    const elementText = wrapper.element.querySelector(
      '[data-testid="textBtn"]'
    ).innerHTML;
    expect(elementText).toMatch("Join");
    expect(elementText).toContain("hi-solid-plus");
  });

  it("Should render the correct values in the right places and button text when isReader is true and the participant hasn't voted", () => {
    const wrapper = mount(BookCard, {
      props: {
        book: {
          title: "Matar a un ruiseñor",
          participants: 8,
          author: "Leslie y Mar",
        },
        isReader: false,
      },
    });
    const buttonText = wrapper.element.querySelector(
      '[data-testid="textBtn"]'
    ).innerHTML;
    const elementText = wrapper.element.querySelector(
      '[data-testid="participants"]'
    ).innerHTML;
    expect(elementText).toMatch("8 Interested");
    expect(buttonText).toMatch("Vote");
    expect(buttonText).toContain("hi-solid-plus");
  });
});
