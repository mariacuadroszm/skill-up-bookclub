// TODO: Find out the difference between mount and shallowMount
import { mount } from "@vue/test-utils";
import ButtonComponent from "../../ui-components/ButtonComponent.vue";
import { assert, describe, test } from "vitest";

describe("Testing ButtonComponent", () => {
  test("Should be primary", () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        variant: "primary",
      },
    });
    assert.equal(wrapper.vm.isPrimary, true);
  });
});
