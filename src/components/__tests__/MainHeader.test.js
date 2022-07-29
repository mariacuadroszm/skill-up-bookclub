import { mount } from "@vue/test-utils";
import MainHeader from "../MainHeader.vue";
import ButtonBC from "../ui-components/ButtonComponent.vue";
import { expect, describe, test } from "vitest";

describe("Testing UI: MainHeader", () => {
  test("Should display the go back button if it is required in an specific view", () => {
    const wrapper = mount(MainHeader, {
      props: { displayBackBtn: false },
    });
    const button = wrapper.findComponent(ButtonBC);
    expect(button.exists()).toBe(false);
  });
});
