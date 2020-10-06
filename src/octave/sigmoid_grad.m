function g = sigmoid_grad(z)
    g = sigmoid(z) .* (1 - sigmoid(z));
end