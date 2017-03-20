function test_algorithm()
    more off;

    data_dir = '../../data_test/';
    unlabeled_dir = strcat(data_dir, 'unlabeled/');
    labeled_dir = strcat(data_dir, 'labeled/');
    weights_dir = '../../data/weights/';

    Theta1_path = strcat(weights_dir, 'theta_1.mat');
    Theta2_path = strcat(weights_dir, 'theta_2.mat');

    Theta1 = load(Theta1_path);
    Theta2 = load(Theta2_path);

    [X, y] = get_shuffled_examples(false);

    p = predict(Theta1, Theta2, X);
    accuracy = compare_p_y(p, y);
    printf('test set accuracy: %d%%\n', accuracy * 100);
end