// TODO: Find out the difference between mount and shallowMount
import { mount } from "@vue/test-utils";
import BookCard from "../BookCard.vue";
import { assert, describe, expect, it, test } from "vitest";

describe("Testing UI: BookCard", () => {
  test("Should render the correct values in the right places when isReader is true", () => {
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
    assert.equal(
      wrapper.element.querySelector('[data-testid="participants"]').innerHTML,
      "8 Readers " //penditente cambiar tocontain
    );
  });

  it("Should render the correct values when isReader is false", () => {
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
    const elementText = wrapper.element.querySelector(
      '[data-testid="participants"]'
    ).innerHTML;

    expect(elementText).toContain("8 Interested");  //puedo hacer este en los test anteriores dentro del mismo it
  });

  it("Should render the correct text for the button when isReader is true and the participant hasn't voted", () => {
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
    const elementText = wrapper.element.querySelector(
      '[data-testid="textBtn"]'
    ).innerHTML;
    expect(elementText).toContain("Join");
    expect(elementText).toContain("hi-solid-plus"); // puedo ponerle un data-test al icono
  });

  it("Should render the correct text and icon for the button when isReader is false and the participant hasn't voted", () => {
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
    const elementText = wrapper.element.querySelector(
      '[data-testid="textBtn"]'
    ).innerHTML;
    expect(elementText).toContain("Vote");
    expect(elementText).toContain("hi-solid-plus");
  });

  //pendiente joined y voted, cómo simular el click para cambiar el valor de uservoted

  //pendiente investigar el router y el click. debo buscar una forma de hacer el test despues de que se renderice el click (nextClick)

  //preguntar a Jose qué debo hacer con el error cuando se envía el form - hacer un alert básico.
});
