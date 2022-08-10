import { mount } from "@vue/test-utils";
import CompleteBookInfo from "../CompleteBookInfo.vue";
import { describe, expect, test } from "vitest";

describe("Testing UI: Complete book info", () => {
  test("Should render all the information about a book", () => {
    const wrapper = mount(CompleteBookInfo, {
      props: { book: {} },
    });

    const title = wrapper.find('[data-testid="title"]');
    const author = wrapper.find('[data-testid="author"]');
    const participants = wrapper.find('[data-testid="participants"]');
    const synopsis = wrapper.find('[data-testid="synopsis"]');

    expect(title.exists()).toBe(true);
    expect(author.exists()).toBe(true);
    expect(participants.exists()).toBe(true);
    expect(synopsis.exists()).toBe(true);
  });

  test("Should render a 'Where to buy' button", () => {
    const wrapper = mount(CompleteBookInfo, {
      props: { book: {} },
    });

    const buyBtn = wrapper.find('[data-testid="buyBtn"]');
    expect(buyBtn.exists()).toBe(true);
  });

  test("Should render a computed message", () => {
    const wrapper = mount(CompleteBookInfo, {
      props: { book: {} },
    });

    const message = wrapper.find('[data-testid="message"]');
    expect(message.exists()).toBe(true);
  });

  test("Should render a 'Vote' button and a specific computed message when userVoted is false and isReader is false", () => {
    const wrapper = mount(CompleteBookInfo, {
      data() {
        return {
          userVoted: false,
        };
      },
      props: {
        book: {},
        isReader: false,
      },
    });

    const btnText = wrapper.find('[data-testid="textBtn"]');
    const message = wrapper.find('[data-testid="message"]');

    expect(btnText.text()).toContain("Vote");
    expect(btnText.html()).toContain("hi-solid-plus");
    expect(message.text()).toContain(
      `Tap the "vote" button to be part of our club once it has five or more interested readers.`
    );
  });

  test("Should render a 'Voted' button and a specific computed message when userVoted is true and isReader is false", () => {
    const wrapper = mount(CompleteBookInfo, {
      data() {
        return {
          userVoted: true,
        };
      },
      props: {
        book: {},
        isReader: false,
      },
    });

    const btnText = wrapper.find('[data-testid="textBtn"]');
    const message = wrapper.find('[data-testid="message"]');

    expect(btnText.text()).toContain("Voted");
    expect(btnText.html()).toContain("hi-solid-check");
    expect(message.text()).toContain(
      `Now you're part of this club! Once it starts you'll find this book profile on "active clubs"`
    );
  });

  test("Should render a 'Join' button and a specific computed message when userVoted is false and isReader is true", () => {
    const wrapper = mount(CompleteBookInfo, {
      data() {
        return {
          userVoted: false,
        };
      },
      props: {
        book: {},
        isReader: true,
      },
    });

    const btnText = wrapper.find('[data-testid="textBtn"]');
    const message = wrapper.find('[data-testid="message"]');

    expect(btnText.text()).toContain("Join");
    expect(btnText.html()).toContain("hi-solid-plus");
    expect(message.text()).toContain(
      `Tap "join" to be part of this awesome club. Remember it already started!`
    );
  });

  test("Should render a 'Joined' button and a specific computed message when userVoted is true and isReader is true", () => {
    const wrapper = mount(CompleteBookInfo, {
      data() {
        return {
          userVoted: true,
        };
      },
      props: {
        book: {},
        isReader: true,
      },
    });

    const btnText = wrapper.find('[data-testid="textBtn"]');
    const message = wrapper.find('[data-testid="message"]');

    expect(btnText.text()).toContain("Joined");
    expect(btnText.html()).toContain("hi-solid-check");
    expect(message.text()).toContain(`Now you're part of this club!`);
  });
});
