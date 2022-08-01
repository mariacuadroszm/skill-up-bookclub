import { mount } from "@vue/test-utils";
import MainHeader from "../MainHeader.vue";
import ButtonBC from "../ui-components/ButtonComponent.vue";
import { expect, describe, it } from "vitest";

describe("Testing UI: MainHeader", () => {
  it("Shouldn't display the go back button if it isn't required", () => {
    const wrapper = mount(MainHeader, {
      props: { displayBackBtn: false },
    });
    const button = wrapper.findComponent(ButtonBC);
    expect(button.exists()).toBe(false);
  });

  it("Should display the go back button if it is required", () => {
    const wrapper = mount(MainHeader, {
      props: { displayBackBtn: true },
    });
    const button = wrapper.findComponent(ButtonBC);
    expect(button.exists()).toBe(true);
  });

  //pendiente testear el router goback method
});
