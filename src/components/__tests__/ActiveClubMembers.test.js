import { mount } from "@vue/test-utils";
import ActiveClubMembers from "../ActiveClubMembers.vue";
import { describe, expect, test } from "vitest";

describe("Testing UI: Lists of members", () => {
  test("Does not render the component if isReader is false", () => {
    const wrapper = mount(ActiveClubMembers, {
      props: { isReader: false },
    });

    expect(wrapper.isVisible()).toBe(false);
  });

  test("Should render the component if isReader is true", () => {
    const wrapper = mount(ActiveClubMembers, {
      props: { isReader: true },
    });

    expect(wrapper.exists()).toBe(true);
  });

  test("Should render the title", () => {
    const wrapper = mount(ActiveClubMembers, {
      props: { isReader: true },
    });

    const title = wrapper.find('[data-testid="title"]');
    expect(title.text()).toContain("List of members");
  });

  test("Should render 5 members", () => {
    const wrapper = mount(ActiveClubMembers, {
      data() {
        return {
          members: [
            { name: "Steve Rogers" },
            { name: "Tony Stark" },
            { name: "Natasha Romanoff" },
            { name: "Thor Odinson" },
            { name: "Bruce Banner" },
          ],
        };
      },
      props: {
        isReader: true,
      },
    });

    const members = wrapper.findAll('[data-testid="member"]');

    expect(members.length).toBe(5);
  });

  test("Should render a span that when clicked, the full list of members will be rendered", () => {
    const wrapper = mount(ActiveClubMembers, {
      props: { isReader: true },
    });

    const span = wrapper.find('[data-testid="full-list"]');
    expect(span.exists()).toBe(true);
  });

  test("Should render the full list of members once the span has been clicked", () => {
    const wrapper = mount(ActiveClubMembers, {
      data() {
        return {
          members: [
            { name: "Steve Rogers" },
            { name: "Tony Stark" },
            { name: "Natasha Romanoff" },
            { name: "Thor Odinson" },
            { name: "Bruce Banner" },
            { name: "Clint Barton" },
            { name: "Carol Danvers" },
          ],
          viewFullList: true,
        };
      },
      props: { isReader: true },
    });

    const members = wrapper.findAll('[data-testid="member"]');
    expect(members.length).toBeGreaterThan(5);
  });
});
