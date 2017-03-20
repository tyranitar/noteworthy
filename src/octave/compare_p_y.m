function accuracy = compare_p_y(p, y)
    len = length(p);
    count = 0;

    for i = 1:len
        count = count + isequal(p(i, :), y(i, :));
    end

    accuracy = count / len;
end