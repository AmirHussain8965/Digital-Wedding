document.addEventListener("DOMContentLoaded", () => {
    // Select all inputs
    const authInputs = document.querySelectorAll(".form_input");

    // Add a slight lift effect to the parent row when an input is focused
    authInputs.forEach(input => {
        input.addEventListener("focus", () => {
            const parentGroup = input.closest(".form_group");
            if(parentGroup) {
                parentGroup.style.transform = "translateY(-2px)";
                parentGroup.style.transition = "transform 0.3s ease";
            }
        });

        input.addEventListener("blur", () => {
            const parentGroup = input.closest(".form_group");
            if(parentGroup) {
                parentGroup.style.transform = "translateY(0)";
            }
        });
    });
});